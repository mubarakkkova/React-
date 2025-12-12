import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { fetchItemById } from '../features/items/itemsSlice.js'
import Spinner from '../components/Spinner.jsx'
import ErrorBox from '../components/ErrorBox.jsx'
import { Link } from 'react-router-dom'
import { useFavorites } from '../hooks/useFavorites.js'

export default function Favorites() {
  const dispatch = useDispatch()

  // 🔥 custom hook
  const { favoritesIds, remove } = useFavorites()

  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    async function loadAll() {
      if (favoritesIds.length === 0) {
        setItems([])
        return
      }

      try {
        setError(null)
        setLoading(true)

        const results = []
        for (const id of favoritesIds) {
          const action = await dispatch(fetchItemById(id))
          if (action.type.endsWith('/fulfilled')) {
            results.push(action.payload)
          }
        }

        if (!cancelled) setItems(results)
      } catch (e) {
        if (!cancelled) setError(e.message || 'Failed to load favorites')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    loadAll()
    return () => {
      cancelled = true
    }
  }, [favoritesIds, dispatch])

  return (
    <section>
      <h1>Favorites</h1>

      {favoritesIds.length === 0 && <p>You have no favorites yet.</p>}

      {loading && <Spinner />}
      {error && !loading && <ErrorBox message={error} />}

      {!loading && !error && items.length > 0 && (
        <ul style={{ listStyle: 'none', padding: 0, marginTop: 16 }}>
          {items.map(item => (
            <li
              key={item.id}
              style={{
                background: '#fff',
                borderRadius: 12,
                padding: 12,
                marginBottom: 10,
                display: 'flex',
                gap: 12,
                alignItems: 'center',
              }}
            >
              <img
                src={item.thumbnail}
                alt={item.title}
                style={{
                  width: 70,
                  height: 70,
                  objectFit: 'cover',
                  borderRadius: 10,
                }}
              />

              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700 }}>{item.title}</div>
                <div style={{ fontSize: 13, color: '#6a6f85' }}>
                  ${item.price} • {item.category}
                </div>
                <Link
                  to={`/items/${item.id}`}
                  style={{ fontSize: 13, color: '#4b5cb1' }}
                >
                  Open details
                </Link>
              </div>

              <button
                type="button"
                onClick={() => remove(item.id)}
                style={{
                  border: 'none',
                  borderRadius: 8,
                  padding: '8px 10px',
                  cursor: 'pointer',
                  fontWeight: 700,
                  background: '#ffe6e6',
                  color: '#8b0000',
                }}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
