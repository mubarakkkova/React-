const BASE_URL = 'https://dummyjson.com/products'

async function handleResponse(res) {
  if (!res.ok) {
    const text = await res.text()
    throw new Error(text || `Request failed with status ${res.status}`)
  }
  return res.json()
}


export async function searchItems(query = '', limit = 5, skip = 0) {
  const url = query
    ? `${BASE_URL}/search?q=${encodeURIComponent(query)}&limit=${limit}&skip=${skip}`
    : `${BASE_URL}?limit=${limit}&skip=${skip}`

  const res = await fetch(url)
  return handleResponse(res)
}


export async function getItemById(id) {
  const res = await fetch(`${BASE_URL}/${id}`)
  return handleResponse(res)
}
