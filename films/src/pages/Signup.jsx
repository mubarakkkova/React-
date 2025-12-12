import React, { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../AuthContext.jsx'
import Spinner from '../components/Spinner.jsx'
import ErrorBox from '../components/ErrorBox.jsx'

export default function Signup() {
  const { signup } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // правила пароля
  const passwordRules = useMemo(() => {
    return {
      hasMinLen: password.length >= 8,
      hasNumber: /\d/.test(password),
      hasSpecial: /[^A-Za-z0-9]/.test(password),
    }
  }, [password])

  const validate = () => {
    if (!passwordRules.hasMinLen) return 'Password must be at least 8 characters.'
    if (!passwordRules.hasNumber) return 'Password must include at least one number.'
    if (!passwordRules.hasSpecial) return 'Password must include at least one special character.'
    if (password !== repeatPassword) return 'Repeat password must match password.'
    return null
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setError(null)

    const validationError = validate()
    if (validationError) {
      setError(validationError)
      return
    }

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
        {/* EMAIL */}
        <div style={{ marginBottom: '12px' }}>
          <label style={{ display: 'block', marginBottom: '4px' }}>
            Email
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={e => {
              setEmail(e.target.value)
              setError(null)
            }}
            className="search-input"
            placeholder="name@example.com"
          />
        </div>

        {/* PASSWORD */}
        <div style={{ marginBottom: '12px' }}>
          <label style={{ display: 'block', marginBottom: '4px' }}>
            Password
          </label>
          <input
            type="password"
            required
            value={password}
            onChange={e => {
              setPassword(e.target.value)
              setError(null)
            }}
            className="search-input"
            placeholder="8+ chars, 1 number, 1 special"
          />

          <div style={{ marginTop: '8px', fontSize: '13px', color: '#6a6f85' }}>
            <div>{passwordRules.hasMinLen ? '✅' : '❌'} at least 8 characters</div>
            <div>{passwordRules.hasNumber ? '✅' : '❌'} at least one number</div>
            <div>{passwordRules.hasSpecial ? '✅' : '❌'} at least one special character</div>
          </div>
        </div>

        {/* REPEAT PASSWORD */}
        <div style={{ marginBottom: '12px' }}>
          <label style={{ display: 'block', marginBottom: '4px' }}>
            Repeat password
          </label>
          <input
            type="password"
            required
            value={repeatPassword}
            onChange={e => {
              setRepeatPassword(e.target.value)
              setError(null)
            }}
            className="search-input"
            placeholder="repeat password"
          />
        </div>

        <button type="submit" className="load-btn" disabled={loading}>
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
