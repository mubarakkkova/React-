import { useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  toggleFavorite,
  removeFavorite,
  selectFavoritesIds,
  selectIsFavorite,
} from '../features/favorites/favoritesSlice.js'

export function useFavorites(itemId) {
  const dispatch = useDispatch()

  const ids = useSelector(selectFavoritesIds)

  // если itemId передали — узнаём, в избранном ли он
  const isFavorite = useSelector(state =>
    itemId != null ? selectIsFavorite(state, Number(itemId)) : false
  )

  const toggle = useCallback(
    (id) => dispatch(toggleFavorite(Number(id ?? itemId))),
    [dispatch, itemId]
  )

  const remove = useCallback(
    (id) => dispatch(removeFavorite(Number(id ?? itemId))),
    [dispatch, itemId]
  )

  const count = ids.length

  // чтобы не создавать новый массив при каждом рендере (для защиты можно сказать)
  const favoritesIds = useMemo(() => ids, [ids])

  return { favoritesIds, count, isFavorite, toggle, remove }
}
