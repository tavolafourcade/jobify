import React from 'react'
import { useAppContext } from '../context/appContext'

function Alert() {
  // Getting Global state variables with useAppContext()
  const { alertText, alertType } = useAppContext()
  return (
    <div className={`alert alert-${alertType}`}>
      {alertText}
    </div>
  )
}

export default Alert
