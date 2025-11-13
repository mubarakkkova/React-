import React from 'react'
import { Link } from 'react-router-dom'
import './MovieCard.css'

export default function MovieCard({ movie }) {
  const { id, title, brand, category, price, thumbnail, rating } = movie
  const cover = thumbnail

  return (
    <article className="card">
      {cover ? (
        <img className="card__img" src={cover} alt={title} loading="lazy" />
      ) : (
        <div className="card__img card__img--placeholder" aria-hidden="true" />
      )}

      <div className="card__body">
        <h3 className="card__title">{title}</h3>
        {brand && (
          <p className="card__meta">
            <strong>Brand:</strong> {brand}
          </p>
        )}
        {category && (
          <p className="card__meta">
            <strong>Category:</strong> {category}
          </p>
        )}
        <p className="card__meta">
          <strong>Price:</strong> ${price}
        </p>
        {rating != null && (
          <p className="card__meta">
            <strong>Rating:</strong> {rating}
          </p>
        )}

        <p className="card__meta" style={{ marginTop: '8px' }}>
          <Link to={`/items/${id}`} style={{ color: '#8ba6f0', textDecoration: 'none' }}>
            View details →
          </Link>
        </p>
      </div>
    </article>
  )
}
