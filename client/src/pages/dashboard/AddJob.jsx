import React from 'react'
import { useAppContext } from '../../context/appContext'
import Wrapper from '../../assets/wrappers/DashboardFormPage'
import { Alert, FormRow, FormRowSelect } from '../../components'

function AddJob() {
  const {
    isEditing,
    isLoading,
    showAlert,
    displayAlert,
    position,
    company,
    jobLocation,
    jobType,
    jobTypeOptions,
    status,
    statusOptions,
    handleChange,
    clearValues,
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
    handleChange({ name, value })
  }
  return (
    <Wrapper>
      <form className="form">
        <h3>{isEditing ? 'Edit job' : 'Add job'}</h3>
        {showAlert && <Alert /> }
        <div className="form-center">
          {/* position */}
          <FormRow type="text" name="position" value={position} handleChange={handleJobInput} />
          {/* company */}
          <FormRow type="text" name="company" value={company} handleChange={handleJobInput} />
          {/* location */}
          <FormRow type="text" name="jobLocation" labelText="job location" value={jobLocation} handleChange={handleJobInput} />
          {/* job status */}
          <FormRowSelect name="status" value={status} handleChange={handleJobInput} list={statusOptions} />
          {/* job type */}
          <FormRowSelect name="jobType" labelText="Job Type" value={jobType} handleChange={handleJobInput} list={jobTypeOptions} />

          <div className="btn-container">
            <button type="submit" className="btn btn-block submit-btn" onClick={handleSubmit} disabled={isLoading}>submit</button>
            <button
              type="submit"
              className="btn btn-block clear-btn"
              onClick={(e) => {
                e.preventDefault() // Prevent the page from refreshing
                clearValues()
              }}
            >
              clear
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  )
}

export default AddJob
