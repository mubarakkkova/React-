import React, { useState } from 'react'
import MovieCard from './MovieCard.jsx'
import './MovieList.css'

export default function MovieList() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

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

  return (
    <section>
      <button className="load-btn" onClick={load} disabled={loading}>
        {loading ? 'Loading…' : 'Load movies'}
      </button>

      {error && <div className="status">Error: {error}</div>}

      {/* ВАЖНО: требование — использовать <ul> */}
      <ul className="movie-list" aria-live="polite">
        {items.map((m) => (
          <li key={m.id} className="movie-list__item">
            {/* Передаём фильм В КАРТОЧКУ через props */}
            <MovieCard movie={m} />
          </li>
        ))}
      </ul>

      {!loading && items.length === 0 && !error && (
        <div className="status">Click “Load movies” to fetch data.</div>
      )}
    </section>
  )
}
