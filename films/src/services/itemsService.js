const BASE_URL = 'https://dummyjson.com/products'

async function handleResponse(res) {
  if (!res.ok) {
    const text = await res.text()
    throw new Error(text || `Request failed with status ${res.status}`)
  }
  return res.json()
}

export async function searchItems(query) {
  const url = query
    ? `${BASE_URL}/search?q=${encodeURIComponent(query)}`
    : `${BASE_URL}?limit=30`

  const res = await fetch(url)
  const data = await handleResponse(res)
  return data.products ?? []
}

export async function getItemById(id) {
  const res = await fetch(`${BASE_URL}/${id}`)
  return handleResponse(res)
}
