import React from 'react'
import { NavLink } from 'react-router-dom'

export default function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar__brand">Dummy Products</div>
      <div className="navbar__links">
        <NavLink to="/" end>
          Home
        </NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/items">Items</NavLink>
        <NavLink to="/login">Login</NavLink>
      </div>
    </nav>
  )
}
