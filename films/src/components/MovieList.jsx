import React, { useState } from 'react'
import MovieCard from './MovieCard.jsx'
import './MovieList.css'

export default function MovieList() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  
  const [search, setSearch] = useState('')

  const load = async () => {
    try {
      setError(null)
      setLoading(true)
      const res = await fetch('https://ghibliapi.vercel.app/films')
      if (!res.ok) throw new Error('Network error')
      const data = await res.json()
      setItems(data.slice(0, 12)) // первые 12 фильмов
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

 
  const query = search.trim().toLowerCase()
  const visible = items.filter(m => m.title.toLowerCase().includes(query))

  const clearSearch = () => setSearch('')

  return (
    <section>
      <button className="load-btn" onClick={load} disabled={loading}>
        {loading ? 'Loading…' : 'Load movies'}
      </button>

      
      <div className="search-row" role="search">
        <input
          className="search-input"
          type="text"
          placeholder="Search by title…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Search movies by title"
          disabled={items.length === 0 && !loading && !error}
        />
        <button
          className="clear-btn"
          onClick={clearSearch}
          disabled={!search}
          aria-label="Clear search"
          title="Clear"
        >
          Clear
        </button>
      </div>

      {error && <div className="status">Error: {error}</div>}

      
      {!loading && items.length === 0 && !error && (
        <div className="status">Click “Load movies” to fetch data.</div>
      )}
      {items.length > 0 && (
        <div className="status">
          Showing {visible.length} of {items.length}{query ? ` for “${search}”` : ''}
        </div>
      )}
      {items.length > 0 && visible.length === 0 && query && (
        <div className="status">No matches for “{search}”.</div>
      )}

   
      <ul className="movie-list" aria-live="polite">
        {visible.map((m) => (
          <li key={m.id} className="movie-list__item">
            <MovieCard movie={m} />
          </li>
        ))}
      </ul>
    </section>
  )
}
