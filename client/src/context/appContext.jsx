/* eslint-disable no-shadow */
import React, {
  useReducer, useContext, createContext, useMemo,
} from 'react'
import axios from 'axios'
// eslint-disable-next-line import/no-cycle
import reducer from './reducer'
import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  TOGGLE_SIDEBAR,
  LOGOUT_USER,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  HANDLE_CHANGE,
  CLEAR_VALUES,
  CREATE_JOB_BEGIN,
  CREATE_JOB_SUCCESS,
  CREATE_JOB_ERROR,
  GET_JOBS_BEGIN,
  GET_JOBS_SUCCESS,
} from './actions'

const token = localStorage.getItem('token')
const user = localStorage.getItem('user')
const userLocation = localStorage.getItem('location')

// Create initial Global State
const initialState = {
  isLoading     : false,
  showAlert     : false,
  alertText     : '',
  alertType     : '',
  user          : user ? JSON.parse(user) : null,
  token,
  userLocation  : userLocation || '',
  showSidebar   : false,
  isEditing     : false, // to go into edition mode
  editJobId     : '',
  position      : '',
  company       : '',
  jobLocation   : userLocation || '',
  jobTypeOptions: [ 'full-time', 'part-time', 'remote', 'internship' ],
  jobType       : 'full-time',
  statusOptions : [ 'pending', 'interview', 'declined' ],
  status        : 'pending',
  jobs          : [],
  totalJobs     : 0,
  page          : 1,
  numOfPages    : 1,
}

// Context provides a way to pass data through the component tree without
// having to pass props down manually at every level

// Create the context
const AppContext = createContext()

// React uses provider pattern in Context API to share data across the tree descendant nodes.
// useReducer: reducer is going to be the function which will handle our dispatch
function AppProvider({ children }) {
  const [ state, dispatch ] = useReducer(reducer, initialState)

  // Axios Global setup
  // axios.defaults.headers.common.Authorization = `Bearer ${state.token}`

  const authFetch = axios.create({
    baseURL: '/api/v1',
    // headers: {
    //   Authorization: `Bearer ${state.token}`,
    // },
  })

  // request
  authFetch.interceptors.request.use(
    (config) => {
      // eslint-disable-next-line no-param-reassign
      config.headers.common.Authorization = `Bearer ${state.token}`
      return config
    },
    (error) => Promise.reject(error),
  )

  // response
  authFetch.interceptors.response.use(
    (response) => response,
    (error) => {
      // console.log(error.response)
      if (error.response.status === 401) {
        // eslint-disable-next-line no-use-before-define
        logoutUser()
      }
      return Promise.reject(error)
    },
  )

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT })
    }, 3000)
  }

  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT })
    clearAlert()
  }

  const toggleSidebar = () => {
    dispatch({ type: TOGGLE_SIDEBAR })
    clearAlert()
  }

  const addUserToLocalStorage = (user, token, location) => {
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('token', token)
    localStorage.setItem('location', location)
  }

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    localStorage.removeItem('location')
  }

  const setupUser = async ({ currentUser, endPoint, alertText }) => {
    dispatch({ type: SETUP_USER_BEGIN })
    try {
      const { data } = await axios.post(`/api/v1/auth/${endPoint}`, currentUser)
      // console.log('currentUserLogged', data)
      // console.log('ENDPOINT', endPoint)
      const { user, token, userLocation } = data
      dispatch({
        type   : SETUP_USER_SUCCESS,
        payload: {
          user, token, userLocation, alertText,
        },
      })
      addUserToLocalStorage(user, token, userLocation)
    } catch (error) {
      dispatch({
        type   : SETUP_USER_ERROR,
        payload: { msg: error.response.data.msg },
      })
    }
    clearAlert()
  }

  const logoutUser = () => {
    dispatch({
      type: LOGOUT_USER,
    })
    removeUserFromLocalStorage()
  }

  const updateUser = async (currentUser) => {
    dispatch({ type: UPDATE_USER_BEGIN })
    try {
      const { data } = await authFetch.patch('/auth/updateUser', currentUser)
      const { user, location, token } = data

      dispatch({
        type   : UPDATE_USER_SUCCESS,
        payload: {
          user, location, token,
        },
      })
      addUserToLocalStorage({ user, token, location })
    } catch (error) {
      if (error.response.status !== 401) {
        dispatch({
          type   : UPDATE_USER_ERROR,
          payload: { msg: error.response.data.msg },
        })
      }
    }
    clearAlert()
  }

  const handleChange = ({ name, value }) => {
    dispatch({
      type   : HANDLE_CHANGE,
      payload: { name, value },
    })
  }

  const clearValues = () => {
    dispatch({
      type: CLEAR_VALUES,
    })
  }

  const createJob = async () => {
    dispatch({ type: CREATE_JOB_BEGIN })
    try {
      const {
        position, company, jobLocation, jobType, status,
      } = state

      await authFetch.post('/jobs', {
        position, company, jobLocation, jobType, status,
      })

      dispatch({ type: CREATE_JOB_SUCCESS })
      dispatch({ type: CLEAR_VALUES })
    } catch (error) {
      if (error.response.status === 401) return
      dispatch({
        type   : CREATE_JOB_ERROR,
        payload: { msg: error.response.data.msg },
      })
    }
    clearAlert()
  }

  const getJobs = async () => {
    const url = '/jobs'
    dispatch({ type: GET_JOBS_BEGIN })
    try {
      const { data } = await authFetch(url) // By default is get request
      const { jobs, totalJobs, numOfPages } = data
      dispatch({
        type   : GET_JOBS_SUCCESS,
        payload: { jobs, totalJobs, numOfPages },
      })
    } catch (error) {
      console.log('error.response', error.response)
      // logoutUser()
    }
    clearAlert()
  }

  const setEditJob = (id) => {
    console.log(`setEditJob ${id}`)
  }

  const deleteJob = (id) => {
    console.log(`deleteJob ${id}`)
  }

  // Spreading initialState values to be passed down to our components.
  const contextValues = useMemo(() => ({
    ...state,
    displayAlert,
    clearAlert,
    setupUser,
    toggleSidebar,
    logoutUser,
    updateUser,
    handleChange,
    clearValues,
    createJob,
    getJobs,
    setEditJob,
    deleteJob,
  }))

  // children refers to our application
  return (
    <AppContext.Provider value={contextValues}>
      {children}
    </AppContext.Provider>
  )
}

// useAppContext allows to use the AppContext everywhere so I can acess wherever is in the value
const useAppContext = () => useContext(AppContext)
export { AppProvider, initialState, useAppContext }
