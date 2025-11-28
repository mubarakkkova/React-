import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { searchItems, getItemById } from '../../services/itemsService.js'

// thunk для списка
export const fetchItems = createAsyncThunk(
  'items/fetchItems',
  async (query, thunkAPI) => {
    try {
      const data = await searchItems(query || '')
      return { data, query: query || '' }
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message || 'Failed to load items')
    }
  }
)

// thunk для одного элемента
export const fetchItemById = createAsyncThunk(
  'items/fetchItemById',
  async (id, thunkAPI) => {
    try {
      const data = await getItemById(id)
      return data
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message || 'Failed to load item')
    }
  }
)

const initialState = {
  list: [],
  selectedItem: null,
  loadingList: false,
  loadingItem: false,
  errorList: null,
  errorItem: null,
  query: '',
}

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    clearSelectedItem(state) {
      state.selectedItem = null
      state.errorItem = null
    },
  },
  extraReducers: builder => {
    // список
    builder
      .addCase(fetchItems.pending, state => {
        state.loadingList = true
        state.errorList = null
        state.list = []
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.loadingList = false
        state.list = action.payload.data
        state.query = action.payload.query
        state.errorList = null
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.loadingList = false
        state.errorList = action.payload || action.error.message
        state.list = []
      })

    // детали
    builder
      .addCase(fetchItemById.pending, state => {
        state.loadingItem = true
        state.errorItem = null
        state.selectedItem = null
      })
      .addCase(fetchItemById.fulfilled, (state, action) => {
        state.loadingItem = false
        state.selectedItem = action.payload
        state.errorItem = null
      })
      .addCase(fetchItemById.rejected, (state, action) => {
        state.loadingItem = false
        state.errorItem = action.payload || action.error.message
        state.selectedItem = null
      })
  },
})

export const { clearSelectedItem } = itemsSlice.actions

export default itemsSlice.reducer
