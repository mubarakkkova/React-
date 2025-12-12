import { createSlice } from '@reduxjs/toolkit'

const STORAGE_KEY = 'favorites_ids'

function loadIds() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function saveIds(ids) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids))
  } catch {
    // ignore
  }
}

const initialState = {
  ids: loadIds(), // массив id товаров
}

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite(state, action) {
      const id = action.payload
      if (state.ids.includes(id)) {
        state.ids = state.ids.filter(x => x !== id)
      } else {
        state.ids.push(id)
      }
      saveIds(state.ids)
    },
    removeFavorite(state, action) {
      const id = action.payload
      state.ids = state.ids.filter(x => x !== id)
      saveIds(state.ids)
    },
    clearFavorites(state) {
      state.ids = []
      saveIds(state.ids)
    },
  },
})

export const { toggleFavorite, removeFavorite, clearFavorites } =
  favoritesSlice.actions

export const selectFavoritesIds = state => state.favorites.ids
export const selectIsFavorite = (state, id) => state.favorites.ids.includes(id)

export default favoritesSlice.reducer
