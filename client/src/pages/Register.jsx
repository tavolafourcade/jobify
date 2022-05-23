import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Wrapper from '../assets/wrappers/RegisterPage'
import { Logo, FormRow, Alert } from '../components'
import { useAppContext } from '../context/appContext'

const initialState = {
  name    : '',
  email   : '',
  password: '',
  isMember: true,
}

function Register() {
  const navigate = useNavigate()
  // useAppContext() brings the initial global State of the appContext.js
  const {
    user, isLoading, showAlert, displayAlert, clearAlert, registerUser, loginUser,
  } = useAppContext()
  const [ values, setValues ] = useState(initialState)
  // global state and useNavitage

  // ...values gets me all the current values of the state
  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember })
  }
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const {
      name, email, password, isMember,
    } = values
    // If user doesn't write email, password or name (in case is not a member only)
    if (!email || !password || (!isMember && !name)) {
      displayAlert()
      return
    }

    const currentUser = { name, email, password }
    // Checking if the user is a member
    if (isMember) {
      loginUser(currentUser)
    } else {
      registerUser(currentUser)
    }
    clearAlert()
    console.log('VALUES', values)
  }

  // PROBLEMA!
  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate('/')
      }, 3000)
    }
  }, [ user, navigate ])

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={onSubmit}>
        <Logo />
        <h3>{values.isMember ? 'Login' : 'Register'}</h3>
        {showAlert && <Alert />}
        {/* Name Input */}
        {
          !values.isMember && (
            <FormRow
              type="text"
              name="name"
              value={values.name}
              handleChange={handleChange}
            />
          )

        }
        {/* Email Input */}
        <FormRow
          type="email"
          name="email"
          value={values.email}
          handleChange={handleChange}
        />
        {/* Email Input */}
        <FormRow
          type="password"
          name="password"
          value={values.password}
          handleChange={handleChange}
        />
        <button type="submit" className="btn btn-block" disabled={isLoading}>
          Submit
        </button>
        <p>
          {values.isMember ? 'Not a member yet?' : 'Already a member?'}
          <button type="button" onClick={toggleMember} className="member-btn">
            {values.isMember ? 'Register' : 'Login'}
          </button>
        </p>
      </form>
    </Wrapper>
  )
}

export default Register
