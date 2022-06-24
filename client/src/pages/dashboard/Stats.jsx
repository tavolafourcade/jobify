import React, { useEffect } from 'react'
import { useAppContext } from '../../context/appContext'
import { ChartsContainer, Loading, StatsContainer } from '../../components'

function Stats() {
  const { showStats, isLoading, monthlyApplications } = useAppContext()

  useEffect(
    () => {
      showStats()
    },
    [ ],
  )

  if (isLoading) {
    return <Loading center />
  }
  console.log('monthlyApplications', monthlyApplications)
  return (
    <>
      <StatsContainer />
      {monthlyApplications.length > 0 && <ChartsContainer />}
    </>
  )
}

export default Stats
