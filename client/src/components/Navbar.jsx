import React, { useState, useEffect, useRef } from 'react'
import { FaAlignLeft, FaUserCircle, FaCaretDown } from 'react-icons/fa'
import { useAppContext } from '../context/appContext'
import Logo from './Logo'
import Wrapper from '../assets/wrappers/Navbar'

function Navbar() {
  const { user, logoutUser, toggleSidebar } = useAppContext()
  const [ showLogout, setShowLogout ] = useState(false)
  const logoutRef = useRef()
  // console.log('SHOWLOGOUT', showLogout)

  useEffect(
    () => {
      document.addEventListener('mousedown', (e) => {
        if (!logoutRef.current.contains(e.target)) { setShowLogout(false) }
      })
      // const closeLogoutDropdown = (e) => {
      //   if (e.path[0].tagName !== 'BUTTON') {
      //     setShowLogout(false)
      //   }
      // }
    },
    [ ],
  )

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
        <div className="btn-container" ref={logoutRef}>
          <button
            type="button"
            className="btn"
            onClick={() => setShowLogout(!showLogout)}
          >
            <FaUserCircle />
            {user?.name}
            <FaCaretDown />
          </button>
          <div className={showLogout ? 'dropdown show-dropdown' : 'dropdown'} >
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
