/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import {
  FaSuitcaseRolling, FaCalendarCheck, FaBug,
} from 'react-icons/fa'
import { useAppContext } from '../context/appContext'
import StatItem from './StatItem'
import Wrapper from '../assets/wrappers/StatsContainer'

function StatsContainer() {
  const { stats } = useAppContext()

  const defaultStats = [
    {
      title: 'Pending Applications',
      count: stats.pending || 0,
      icon : <FaSuitcaseRolling />,
      color: '#e9b949',
      bcg  : '#fcefc7',
      id   : 1,
    },
    {
      title: 'Interviews Scheduled',
      count: stats.interview || 0,
      icon : <FaCalendarCheck />,
      color: '#647acb',
      bcg  : '#e0e8f9',
      id   : 2,
    },
    {
      title: 'Jobs Declined',
      count: stats.declined || 0,
      icon : <FaBug />,
      color: '#d66a6a',
      bcg  : '#ffeeee',
      id   : 3,
    },
  ]
  return (
    <Wrapper>
      {
        defaultStats.map((item) => <StatItem key={item.id} {...item} />)
      }
    </Wrapper>
  )
}

export default StatsContainer
