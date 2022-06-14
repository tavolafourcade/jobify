import React from 'react'
import moment from 'moment'

function Job({ company, createdAt }) {
  let date = moment(createdAt)
  date = date.format('MMMM Do YYYY')
  return (
    <div>
      <h2>{company}</h2>
      <h2>{date}</h2>
    </div>
  )
}

export default Job
