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
} from './actions'

const token = localStorage.getItem('token')
const user = localStorage.getItem('user')
const userLocation = localStorage.getItem('location')

// Create initial Global State
const initialState = {
  isLoading   : false,
  showAlert   : false,
  alertText   : '',
  alertType   : '',
  user        : user ? JSON.parse(user) : null,
  token,
  userLocation: userLocation || '',
  jobLocation : '',
  showSidebar : false,
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
  axios.defaults.headers.common.Authorization = `Bearer ${state.token}`
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
      console.log('currentUserLogged', data)
      console.log('ENDPOINT', endPoint)
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
    try {
      const { data } = await axios.patch('/api/v1/auth/updateUser', currentUser)
      console.log('data', data)
    } catch (error) {
      console.log('ERROR', error.response)
      console.log('TOKEN', state.token)
    }
  }

  // Spreading initialState values to be passed down to our components.
  const contextValues = useMemo(() => ({
    ...state, displayAlert, clearAlert, setupUser, toggleSidebar, logoutUser, updateUser,
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
