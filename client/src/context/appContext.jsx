import React, {
  useReducer, useContext, createContext, useMemo,
} from 'react'
import axios from 'axios'
import reducer from './reducer'
import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  REGISTER_USER_BEGIN,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
} from './actions'

// Create initial Global State
const initialState = {
  isLoading   : false,
  showAlert   : false,
  alertText   : '',
  alertType   : '',
  user        : null,
  token       : null,
  userLocation: '',
  jobLocation : '',
}

// Context provides a way to pass data through the component tree without
// having to pass props down manually at every level

// Create the context
const AppContext = createContext()

// React uses provider pattern in Context API to share data across the tree descendant nodes.
// useReducer: reducer is going to be the function which will handle our dispatch
function AppProvider({ children }) {
  const [ state, dispatch ] = useReducer(reducer, initialState)

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT })
    }, 3000)
  }

  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT })
    clearAlert()
  }

  const registerUser = async (currentUser) => {
    dispatch({ type: REGISTER_USER_BEGIN })
    try {
      const res = await axios.post('/api/v1/auth/register', currentUser)
      console.log('currentUser', res)
      const { user, token, userLocation } = res.data
      dispatch({
        type   : REGISTER_USER_SUCCESS,
        payload: { user, token, userLocation },
      })
    } catch (error) {
      console.log('error', error.response)
      dispatch({
        type   : REGISTER_USER_ERROR,
        payload: { msg: error.response.data.msg },
      })
    }
    clearAlert()
  }
  // Spreading initialState values to be passed down to our components.
  const contextValues = useMemo(() => ({
    ...state, displayAlert, clearAlert, registerUser,
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
