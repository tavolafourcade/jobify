import React from 'react'
import { FaTimes } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'
import Wrapper from '../assets/wrappers/SmallSidebar'
import { useAppContext } from '../context/appContext'
import links from '../utils/links'
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
          <div className="nav-links">
            {
              links.map((link) => {
                const {
                  text, path, id, icon,
                } = link
                return (
                  <NavLink
                    key={id}
                    to={path}
                    className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                    onClick={toggleSidebar}
                    activeClassName="active"
                  >
                    <span className="icon">{icon}</span>
                    {text}
                  </NavLink>
                )
              })
            }
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

export default SmallSiderbar
