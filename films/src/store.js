import { configureStore } from '@reduxjs/toolkit'
import itemsReducer from './features/items/itemsSlice.js'
import favoritesReducer from './features/favorites/favoritesSlice.js'

export const store = configureStore({
  reducer: {
    items: itemsReducer,
    favorites: favoritesReducer,
  },
})
