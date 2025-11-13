import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Spinner from './Spinner.jsx'
import ErrorBox from './ErrorBox.jsx'
import { getItemById } from '../services/itemsService.js'

export default function MovieDetails() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [item, setItem] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    async function load() {
      try {
        setLoading(true)
        setError(null)
        setNotFound(false)
        const data = await getItemById(id)
        setItem(data)
      } catch (e) {
        const msg = e.message || ''
        if (msg.includes('404')) setNotFound(true)
        else setError(msg || 'Failed to load item')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [id])

  if (loading) return <Spinner />
  if (error) return <ErrorBox message={error} />
  if (notFound) return <p>Item not found.</p>
  if (!item) return null

  const {
    title,
    description,
    brand,
    category,
    price,
    rating,
    stock,
    discountPercentage,
    thumbnail
  } = item

  return (
    <section>
      <button onClick={() => navigate(-1)} style={{ marginBottom: '16px' }}>
        ← Back
      </button>

      <h1>{title}</h1>

      {thumbnail && (
        <img
          src={thumbnail}
          alt={title}
          style={{
            maxWidth: '320px',
            width: '100%',
            borderRadius: '10px',
            marginBottom: '16px',
            boxShadow: '0 8px 18px rgba(0,0,0,.25)'
          }}
        />
      )}

      <ul>
        <li><strong>ID:</strong> {item.id}</li>
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
