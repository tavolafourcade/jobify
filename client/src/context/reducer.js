import { DISPLAY_ALERT } from "./actions"

const reducer = (state,action) => {
    // Reducer to show a danger alert
    if(action.type === DISPLAY_ALERT){
        return {
            ...state,
            showAlert: true,
            alertType:'danger',
            alertText:'Please provide all values!'
        }
    }
    throw new Error(`no such action: ${action.type}`)
}

export default reducer