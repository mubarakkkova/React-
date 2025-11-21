
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../AuthContext.jsx'
import Spinner from '../components/Spinner.jsx'
import ErrorBox from '../components/ErrorBox.jsx'

export default function Signup() {
  const { signup } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async e => {
    e.preventDefault()
    setError(null)

    try {
      setLoading(true)
      await signup(email, password)
      navigate('/profile')
    } catch (e) {
      setError(e.message || 'Failed to sign up')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section>
      <h1>Signup</h1>
      <form onSubmit={handleSubmit} style={{ maxWidth: '360px' }}>
        <div style={{ marginBottom: '12px' }}>
          <label style={{ display: 'block', marginBottom: '4px' }}>
            Email
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="search-input"
          />
        </div>

        <div style={{ marginBottom: '12px' }}>
          <label style={{ display: 'block', marginBottom: '4px' }}>
            Password
          </label>
          <input
            type="password"
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="search-input"
          />
        </div>

        <button
          type="submit"
          className="load-btn"
          disabled={loading}
        >
          {loading ? 'Signing up…' : 'Create account'}
        </button>
      </form>

      {loading && <Spinner />}
      {error && !loading && <ErrorBox message={error} />}

      <p style={{ marginTop: '16px', fontSize: '14px' }}>
        Already have an account?{' '}
        <Link to="/login" style={{ color: '#4b5cb1' }}>
          Back to login
        </Link>
      </p>
    </section>
  )
}
