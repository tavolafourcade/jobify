/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useEffect } from 'react'
import { useAppContext } from '../context/appContext'
import Loading from './Loading'
import Job from './Job'
import PageBtnContainer from './PageBtnContainer'
import Wrapper from '../assets/wrappers/JobsContainer'

function JobsContainer() {
  const {
    getJobs, jobs, isLoading, totalJobs, search, searchStatus, searchType, sort, numOfPages, page,
  } = useAppContext()

  useEffect(() => {
    getJobs()
  }, [ page, search, searchStatus, searchType, sort ])

  if (isLoading) {
    return <Loading center />
  }

  if (jobs.length === 0) {
    return (
      <Wrapper>
        <h2>No jobs to display...</h2>
      </Wrapper>
    )
  }
  return (
    <Wrapper>
      <h5>
        {totalJobs} job{jobs.length > 1 && 's'} found
      </h5>
      <div className="jobs">
        {jobs.map((job) => <Job key={job._id} {...job} />)}
      </div>
      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  )
}

export default JobsContainer
