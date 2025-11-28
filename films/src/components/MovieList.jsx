import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import MovieCard from './MovieCard.jsx'
import './MovieList.css'
import Spinner from './Spinner.jsx'
import ErrorBox from './ErrorBox.jsx'
import { fetchItems } from '../features/items/itemsSlice.js'

export default function MovieList() {
  const dispatch = useDispatch()
  const [searchParams, setSearchParams] = useSearchParams()
  const q = searchParams.get('q') || ''

  const {
    list,
    loadingList,
    errorList,
  } = useSelector(state => state.items)

  useEffect(() => {
    dispatch(fetchItems(q))
  }, [q, dispatch])

  const handleSearchChange = e => {
    const value = e.target.value
    if (value) setSearchParams({ q: value })
    else setSearchParams({})
  }

  const clearSearch = () => setSearchParams({})

  return (
    <section>
      <h1>Products List</h1>

      <button
        className="load-btn"
        onClick={() => dispatch(fetchItems(q))}
        disabled={loadingList}
      >
        {loadingList ? 'Loading…' : 'Reload items'}
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

      {loadingList && <Spinner />}

      {errorList && !loadingList && <ErrorBox message={errorList} />}

      {!loadingList && !errorList && list.length === 0 && (
        <div className="status">No items found.</div>
      )}

      {list.length > 0 && !loadingList && !errorList && (
        <div className="status">
          Showing {list.length} item{list.length !== 1 ? 's' : ''}
          {q ? ` for “${q}”` : ''}
        </div>
      )}

      <ul className="movie-list" aria-live="polite">
        {list.map(m => (
          <li key={m.id} className="movie-list__item">
            <MovieCard movie={m} />
          </li>
        ))}
      </ul>
    </section>
  )
}
