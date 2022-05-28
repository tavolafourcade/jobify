import React from 'react'
import { Outlet } from 'react-router-dom'
import Wrapper from '../../assets/wrappers/SharedLayout'
import { Navbar, BigSidebar, SmallSiderbar } from '../../components'

function SharedLayout() {
  return (
    <Wrapper>
      <main className="dashboard">
        <SmallSiderbar />
        <BigSidebar />
        <div>
          <Navbar />
          <div className="dashboard-page">
            <Outlet />

          </div>
        </div>
      </main>
    </Wrapper>
  )
}

export default SharedLayout
