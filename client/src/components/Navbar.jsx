import React, { useState } from 'react'
import { FaAlignLeft, FaUserCircle, FaCaretDown } from 'react-icons/fa'
import { useAppContext } from '../context/appContext'
import Logo from './Logo'
import Wrapper from '../assets/wrappers/Navbar'

function Navbar() {
  const { user, logoutUser, toggleSidebar } = useAppContext()
  const [ showLogout, setShowLogout ] = useState(false)
  console.log('SHOWLOGOUT', showLogout)
  return (
    <Wrapper>
      <div className="nav-center">
        <button
          type="button"
          className="toggle-btn"
          onClick={toggleSidebar}
        >
          <FaAlignLeft />
        </button>
        <div>
          <Logo />
          <h3 className="logo-text">Dashboard</h3>
        </div>
        <div className="btn-container">
          <button
            type="button"
            className="btn"
            onClick={() => setShowLogout(!showLogout)}
          >
            <FaUserCircle />
            {user?.name}
            <FaCaretDown />
          </button>
          <div className={showLogout ? 'dropdown show-dropdown' : 'dropdown'}>
            <button
              type="button"
              className="dropdown-btn"
              onClick={logoutUser}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

export default Navbar
