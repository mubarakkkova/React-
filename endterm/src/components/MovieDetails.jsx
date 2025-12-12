import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Spinner from './Spinner.jsx'
import ErrorBox from './ErrorBox.jsx'
import { fetchItemById } from '../features/items/itemsSlice.js'
import { useFavorites } from '../hooks/useFavorites.js'

export default function MovieDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {
    selectedItem,
    loadingItem,
    errorItem,
  } = useSelector(state => state.items)

  // 🔥 custom hook
  const { isFavorite, toggle } = useFavorites(selectedItem?.id)

  useEffect(() => {
    if (id) {
      dispatch(fetchItemById(id))
    }
  }, [id, dispatch])

  if (loadingItem) return <Spinner />
  if (errorItem) return <ErrorBox message={errorItem} />
  if (!selectedItem) return <p>Item not found.</p>

  const {
    title,
    description,
    brand,
    category,
    price,
    rating,
    stock,
    discountPercentage,
    thumbnail,
  } = selectedItem

  return (
    <section>
      <button onClick={() => navigate(-1)} style={{ marginBottom: '16px' }}>
        ← Back
      </button>

      <h1>{title}</h1>

      {/* FAVORITES BUTTON */}
      <button
        type="button"
        onClick={() => toggle(selectedItem.id)}
        style={{
          marginBottom: '16px',
          borderRadius: '8px',
          border: 'none',
          padding: '8px 14px',
          cursor: 'pointer',
          fontWeight: 700,
          background: isFavorite ? '#ffd3e1' : '#e3e8fa',
          color: '#151934',
        }}
      >
        {isFavorite ? '★ Remove from favorites' : '☆ Add to favorites'}
      </button>

      {thumbnail && (
        <img
          src={thumbnail}
          alt={title}
          style={{
            maxWidth: '320px',
            width: '100%',
            borderRadius: '10px',
            marginBottom: '16px',
            boxShadow: '0 8px 18px rgba(0,0,0,.25)',
          }}
        />
      )}

      <ul>
        <li><strong>Brand:</strong> {brand}</li>
        <li><strong>Category:</strong> {category}</li>
        <li><strong>Price:</strong> ${price}</li>
        <li><strong>Rating:</strong> {rating}</li>
        <li><strong>Stock:</strong> {stock}</li>
        <li><strong>Discount percentage:</strong> {discountPercentage}%</li>
      </ul>

      <h2>Description</h2>
      <p>{description}</p>
    </section>
  )
}
