import React from 'react'
import { IoBarChartSharp } from 'react-icons/io5'
import { MdQueryStats } from 'react-icons/md'
import { FaWpforms } from 'react-icons/fa'
import { ImProfile } from 'react-icons/im'

const links = [
  {
    id  : 1,
    icon: <IoBarChartSharp />,
    text: 'stats',
    to  : '/',
  },
  {
    id  : 2,
    icon: <MdQueryStats />,
    text: 'all jobs',
    to  : '/all-jobs',
  },
  {
    id  : 3,
    icon: <FaWpforms />,
    text: 'add job',
    to  : '/add-job',
  },
  {
    id  : 4,
    icon: <ImProfile />,
    text: 'profile',
    to  : '/profile',
  },
]

export default links
