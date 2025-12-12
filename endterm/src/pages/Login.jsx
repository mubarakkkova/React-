import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../AuthContext.jsx'
import Spinner from '../components/Spinner.jsx'
import ErrorBox from '../components/ErrorBox.jsx'

export default function Login() {
  const { login } = useAuth()
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
      await login(email, password)
      navigate('/profile')
    } catch (e) {
      setError(e.message || 'Failed to log in')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section>
      <h1>Login</h1>
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
          {loading ? 'Logging in…' : 'Login'}
        </button>
      </form>

      {loading && <Spinner />}
      {error && !loading && <ErrorBox message={error} />}

      <p style={{ marginTop: '16px', fontSize: '14px' }}>
        Don&apos;t have an account?{' '}
        <Link to="/signup" style={{ color: '#4b5cb1' }}>
          Go to signup
        </Link>
      </p>
    </section>
  )
}
