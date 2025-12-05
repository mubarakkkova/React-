import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
  selectedItem: null,
  page: 1,
  pageSize: 10,
  total: 0,
  search: "",
  filters: {},
};

const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    setItems(state, action) {
      state.list = action.payload;
    },
    setSelectedItem(state, action) {
      state.selectedItem = action.payload;
    },
    setPage(state, action) {
      state.page = action.payload;
    },
    setPageSize(state, action) {
      state.pageSize = action.payload;
    },
    setTotal(state, action) {
      state.total = action.payload;
    },
    setSearch(state, action) {
      state.search = action.payload;
    },
    setFilters(state, action) {
      state.filters = action.payload;
    },
  },
});

export const {
  setItems,
  setSelectedItem,
  setPage,
  setPageSize,
  setTotal,
  setSearch,
  setFilters,
} = itemsSlice.actions;

export default itemsSlice.reducer;
