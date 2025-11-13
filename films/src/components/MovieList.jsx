import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import MovieCard from './MovieCard.jsx'
import './MovieList.css'
import Spinner from './Spinner.jsx'
import ErrorBox from './ErrorBox.jsx'
import { searchItems } from '../services/itemsService.js'

export default function MovieList() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const [searchParams, setSearchParams] = useSearchParams()
  const q = searchParams.get('q') || ''

  const load = async (query) => {
    try {
      setError(null)
      setLoading(true)
      const data = await searchItems(query)
      setItems(data)
    } catch (e) {
      setError(e.message || 'Network error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load(q)
  }, [q])

  const handleSearchChange = (e) => {
    const value = e.target.value
    if (value) setSearchParams({ q: value })
    else setSearchParams({})
  }

  const clearSearch = () => setSearchParams({})

  return (
    <section>
      <h1>Products List</h1>

      <button className="load-btn" onClick={() => load(q)} disabled={loading}>
        {loading ? 'Loading…' : 'Reload items'}
      </button>

      <div className="search-row" role="search">
        <input
          className="search-input"
          type="text"
          placeholder="Search by title…"
          value={q}
          onChange={handleSearchChange}
          aria-label="Search items by title"
        />
        <button
          className="clear-btn"
          onClick={clearSearch}
          disabled={!q}
          aria-label="Clear search"
          title="Clear"
        >
          Clear
        </button>
      </div>

      {loading && <Spinner />}

      {error && !loading && <ErrorBox message={error} />}

      {!loading && !error && items.length === 0 && (
        <div className="status">No items found.</div>
      )}

      {items.length > 0 && !loading && !error && (
        <div className="status">
          Showing {items.length} item{items.length !== 1 ? 's' : ''}
          {q ? ` for “${q}”` : ''}
        </div>
      )}

      <ul className="movie-list" aria-live="polite">
        {items.map(m => (
          <li key={m.id} className="movie-list__item">
            <MovieCard movie={m} />
          </li>
        ))}
      </ul>
    </section>
  )
}
