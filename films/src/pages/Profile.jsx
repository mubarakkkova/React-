import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../AuthContext.jsx'
import Spinner from '../components/Spinner.jsx'

export default function Profile() {
  const { user, loading } = useAuth()

  if (loading) return <Spinner />

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return (
    <section>
      <h1>Profile</h1>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>UID:</strong> {user.uid}
      </p>

      {/* */}
    </section>
  )
}
