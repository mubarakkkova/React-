import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import MovieCard from './MovieCard.jsx'
import Spinner from './Spinner.jsx'
import ErrorBox from './ErrorBox.jsx'
import { fetchItems } from '../features/items/itemsSlice.js'

export default function MovieList() {
  const dispatch = useDispatch()
  const [searchParams, setSearchParams] = useSearchParams()

  const q = searchParams.get('q') || ''
  const page = Number(searchParams.get('page') || 1)

  const {
    list,
    loadingList,
    errorList,
    total,
  } = useSelector(state => state.items)

  const totalPages = Math.ceil(total / 5)

  useEffect(() => {
    dispatch(fetchItems({ query: q, page }))
  }, [q, page, dispatch])

  const setPage = newPage => {
    setSearchParams({
      ...(q ? { q } : {}),
      page: newPage,
    })
  }

  return (
    <section>
      <h1>Products List</h1>

      <input
        className="search-input"
        placeholder="Search…"
        value={q}
        onChange={e =>
          setSearchParams(e.target.value ? { q: e.target.value, page: 1 } : {})
        }
      />

      {loadingList && <Spinner />}
      {errorList && <ErrorBox message={errorList} />}

      <ul className="movie-list">
        {list.map(item => (
          <li key={item.id}>
            <MovieCard movie={item} />
          </li>
        ))}
      </ul>

      {/* PAGINATION */}
      <div style={{ marginTop: 20 }}>
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          ← Prev
        </button>

        <span style={{ margin: '0 12px' }}>
          Page {page} of {totalPages}
        </span>

        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
        >
          Next →
        </button>
      </div>
    </section>
  )
}
