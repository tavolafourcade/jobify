import { useAppContext } from "../context/appContext"

const Alert = () => {
    // Getting Global state variables with useAppContext()
    const {alertText, alertType} = useAppContext()
    return (
        <div className={`alert alert-${alertType}`}>
            {alertText}
        </div>
    )
}

export default Alert
