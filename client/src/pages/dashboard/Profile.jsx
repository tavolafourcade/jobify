import React, { useState } from 'react'
import { FormRow, Alert } from '../../components'
import { useAppContext } from '../../context/appContext'
import Wrapper from '../../assets/wrappers/DashboardFormPage'

function Profile() {
  const {
    user, showAlert, displayAlert, updateUser, isLoading,
  } = useAppContext()

  const [ name, setName ] = useState(user?.name)
  const [ email, setEmail ] = useState(user?.email)
  const [ lastname, setLastname ] = useState(user?.lastname || '')
  const [ location, setLocation ] = useState(user?.location)

  const handleSubmit = (e) => {
    e.preventDefault()
    // remove while testing
    if (!name || !lastname || !email || !location) {
      displayAlert()
      return
    }
    updateUser({
      name, lastname, email, location,
    })
  }
  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h3>Profile</h3>
        {showAlert && <Alert />}
        <div className="form-center">
          <FormRow
            type="text"
            name="name"
            value={name}
            labelText="Name"
            handleChange={(e) => setName(e.target.value)}
          />
          <FormRow
            type="text"
            name="lastName"
            value={lastname}
            labelText="Last Name"
            handleChange={(e) => setLastname(e.target.value)}
          />
          <FormRow
            type="email"
            name="email"
            value={email}
            labelText="Email"
            handleChange={(e) => setEmail(e.target.value)}
          />
          <FormRow
            type="text"
            name="location"
            value={location}
            labelText="Location"
            handleChange={(e) => setLocation(e.target.value)}
          />
          <button className="btn btn-block" type="submit" disabled={isLoading}>{isLoading ? 'Please wait...' : 'Save changes'}</button>
        </div>
      </form>
    </Wrapper>
  )
}

export default Profile
