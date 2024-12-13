import { createSlice } from "@reduxjs/toolkit";
import { addFunction_category } from "./chucnang_hangmucAction";

const reportSlice = createSlice({
  name: "function_category",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      // them hangmuc-chucnang
      .addCase(addFunction_category.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addFunction_category.fulfilled, (state: any, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(addFunction_category.rejected, (state: any, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default reportSlice.reducer;
