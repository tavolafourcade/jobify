import React from 'react'
import { FaTimes } from 'react-icons/fa'
import Wrapper from '../assets/wrappers/SmallSidebar'
import { useAppContext } from '../context/appContext'
import NavLinks from './NavLinks'
import Logo from './Logo'

function SmallSiderbar() {
  const { showSidebar, toggleSidebar } = useAppContext()
  return (
    <Wrapper>
      <div className={showSidebar ? 'sidebar-container show-sidebar' : 'sidebar-container'}>
        <div className="content">
          <button type="button" className="close-btn" onClick={toggleSidebar}>
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          <NavLinks toggleSidebar={toggleSidebar} />
        </div>
      </div>
    </Wrapper>
  )
}

export default SmallSiderbar
