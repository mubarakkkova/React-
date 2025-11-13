import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from './NavBar.jsx'

export default function RootLayout() {
  return (
    <div>
      <NavBar />
      <main className="app">
        <Outlet />
      </main>
    </div>
  )
}
