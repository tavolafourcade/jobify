import React from 'react'
import { FaTimes } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'
import Wrapper from '../assets/wrappers/SmallSidebar'
import { useAppContext } from '../context/appContext'
import links from '../utils/links'
import Logo from './Logo'

function SmallSiderbar() {
  return (
    <Wrapper>
      <div className="sidebar-container show-sidebar">
        <div className="content">
          <button type="button" className="close-btn" onClick={() => console.log('TOGGLE SIDEBAR')}>
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          <div className="nav-links">nav links</div>
        </div>
      </div>
    </Wrapper>
  )
}

export default SmallSiderbar
