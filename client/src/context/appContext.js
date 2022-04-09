import React, { useReducer, useContext, createContext } from 'react'
import reducer from './reducer'
import { DISPLAY_ALERT, CLEAR_ALERT } from "./actions"

// Create initial Global State
const initialState = {
    isLoading: false,
    showAlert: false,
    alertText: '',
    alertType: '',
    user: null,
    token: null,
    userLocation: ''
}

// Context provides a way to pass data through the component tree without
// having to pass props down manually at every level

// Create the context 
const AppContext = createContext()

// React uses provider pattern in Context API to share data across the tree descendant nodes.
//useReducer: reducer is going to be the function which will handle our dispatch 
const AppProvider = ({ children }) => {
    const [ state, dispatch ] = useReducer(reducer,initialState)

    const displayAlert = () => {
        dispatch({type: DISPLAY_ALERT})
        clearAlert()
    }

    const clearAlert = () => {
        setTimeout(()=>{
            dispatch({type: CLEAR_ALERT})
        },3000)
    }
    // Spreading initialState values to be passed down to our components. 
    // children refers to our application
    return (
        <AppContext.Provider value={{...state, displayAlert, clearAlert}}>
            {children}
        </AppContext.Provider>
        )
}

// useAppContext allows to use the AppContext everywhere so I can acess wherever is in the value
const useAppContext = () => {
    return useContext(AppContext)
}
export { AppProvider, initialState, useAppContext }