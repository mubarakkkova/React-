import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { searchItems, getItemById } from '../../services/itemsService.js'


export const fetchItems = createAsyncThunk(
  'items/fetchItems',
  async ({ query = '', page = 1 }, thunkAPI) => {
    try {
      const limit = 5
      const skip = (page - 1) * limit

      const data = await searchItems(query, limit, skip)

      return {
        list: data.products,
        total: data.total,
        query,
        page,
      }
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message || 'Failed to load items')
    }
  }
)

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
  page: 1,
  limit: 5,
  total: 0,
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
    // ===== LIST =====
    builder
      .addCase(fetchItems.pending, state => {
        state.loadingList = true
        state.errorList = null
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.loadingList = false
        state.list = action.payload.list
        state.total = action.payload.total
        state.query = action.payload.query
        state.page = action.payload.page
        state.errorList = null
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.loadingList = false
        state.errorList = action.payload || action.error.message
        state.list = []
      })

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
