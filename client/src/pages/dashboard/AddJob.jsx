import React from 'react'
import { useAppContext } from '../../context/appContext'
import Wrapper from '../../assets/wrappers/DashboardFormPage'
import { Alert, FormRow } from '../../components'

function AddJob() {
  const {
    isEditing,
    showAlert,
    displayAlert,
    position,
    company,
    jobLocation,
    // jobType,
    // jobTypeOptions,
    // status,
    // statusOptions,
  } = useAppContext()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!position || !company || !jobLocation) {
      displayAlert()
    }
    console.log('create job')
  }
  const handleJobInput = (e) => {
    const { name, value } = e.target
    console.log('name: value -->', name, value)
  }
  return (
    <Wrapper>
      <form className="form">
        <h3>{isEditing ? 'Edit job' : 'Add job'}</h3>
        {showAlert && <Alert /> }
        <div className="form-center">
          {/* position */}
          <FormRow type="text" name="position" defaultValue={position} handleChange={handleJobInput} />
          {/* company */}
          <FormRow type="text" name="company" defaultValue={company} handleChange={handleJobInput} />
          {/* location */}
          <FormRow type="text" name="jobLocation" labelText="job location" defaultValue={jobLocation} handleChange={handleJobInput} />
          {/* job type */}
          {/* job status */}
          <div className="btn-container" />
          <button type="submit" className="btn btn-block submit-btn" onClick={handleSubmit}>submit</button>
        </div>
      </form>
    </Wrapper>
  )
}

export default AddJob
