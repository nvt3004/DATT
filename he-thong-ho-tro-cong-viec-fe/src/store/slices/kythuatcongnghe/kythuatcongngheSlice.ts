import { createSlice } from "@reduxjs/toolkit";
import {
  Getall_Engineering_Technology,
  addEngineering_Technology,
} from "../kythuatcongnghe/kythuatcongngheAction";

const reportSlice = createSlice({
  name: "engineering_Technology",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
    .addCase(Getall_Engineering_Technology.pending, (state: any) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(Getall_Engineering_Technology.fulfilled, (state: any, action: any) => {
      state.loading = false;
      state.items = action.payload;
    })
    .addCase(Getall_Engineering_Technology.rejected, (state: any, action: any) => {
      state.loading = false;
      state.error = action.error.message;
    })
  },
});

export default reportSlice.reducer;
