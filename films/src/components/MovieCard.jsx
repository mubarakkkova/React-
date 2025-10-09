import React from 'react'
import './MovieCard.css'

export default function MovieCard({ movie }) {
  const { title, director, release_date, image, movie_banner, rt_score } = movie
  const cover = image || movie_banner

  return (
    <article className="card">
      {cover ? (
        <img className="card__img" src={cover} alt={title} loading="lazy" />
      ) : (
        <div className="card__img card__img--placeholder" aria-hidden="true" />
      )}

      <div className="card__body">
        <h3 className="card__title">{title}</h3>
        <p className="card__meta"><strong>Director:</strong> {director}</p>
        <p className="card__meta"><strong>Release:</strong> {release_date}</p>
        {rt_score && <p className="card__meta"><strong>RT score:</strong> {rt_score}</p>}
      </div>
    </article>
  )
}
