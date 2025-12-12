import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from './NavBar.jsx'
import OfflineBanner from './OfflineBanner.jsx'

export default function RootLayout() {
  return (
    <div>
      <OfflineBanner />
      <NavBar />
      <main className="app">
        <Outlet />
      </main>
    </div>
  )
}
