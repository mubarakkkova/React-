import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toggleFavorite, selectIsFavorite } from '../features/favorites/favoritesSlice.js'
import './MovieCard.css'

export default function MovieCard({ movie }) {
  const { id, title, brand, category, price, thumbnail, rating } = movie
  const dispatch = useDispatch()
  const isFav = useSelector(state => selectIsFavorite(state, id))

  return (
    <article className="card">
      {thumbnail ? (
        <img className="card__img" src={thumbnail} alt={title} loading="lazy" />
      ) : (
        <div className="card__img card__img--placeholder" aria-hidden="true" />
      )}

      <div className="card__body">
        <h3 className="card__title">{title}</h3>

        {brand && <p className="card__meta"><strong>Brand:</strong> {brand}</p>}
        {category && <p className="card__meta"><strong>Category:</strong> {category}</p>}
        <p className="card__meta"><strong>Price:</strong> ${price}</p>
        {rating != null && <p className="card__meta"><strong>Rating:</strong> {rating}</p>}

        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginTop: '10px' }}>
          <button
            type="button"
            onClick={() => dispatch(toggleFavorite(id))}
            style={{
              borderRadius: '8px',
              border: 'none',
              padding: '7px 10px',
              cursor: 'pointer',
              fontWeight: 700,
              background: isFav ? '#ffd3e1' : '#e3e8fa',
              color: '#151934',
              fontSize: '12px',
            }}
            aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
          >
            {isFav ? '★ Saved' : '☆ Save'}
          </button>

          <Link to={`/items/${id}`} style={{ color: '#8ba6f0', textDecoration: 'none' }}>
            View details →
          </Link>
        </div>
      </div>
    </article>
  )
}
