import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../AuthContext.jsx'

export default function NavBar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await logout()
      navigate('/login')
    } catch (e) {
      console.error('Logout error', e)
    }
  }

  return (
    <nav className="navbar">
      <div className="navbar__brand">Dummy Products</div>

      <div className="navbar__links">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/items">Items</NavLink>
        <NavLink to="/favorites">Favorites</NavLink>

        {!user && (
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/signup">Signup</NavLink>
          </>
        )}

        {user && (
          <>
            <NavLink to="/profile">Profile</NavLink>
            <button
              type="button"
              onClick={handleLogout}
              style={{
                marginLeft: '16px',
                background: 'transparent',
                border: '1px solid #ffffff',
                borderRadius: '6px',
                padding: '4px 10px',
                color: '#ffffff',
                cursor: 'pointer',
                fontSize: '13px'
              }}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  )
}
