import { createSlice } from "@reduxjs/toolkit";
import {
  fetchAll_User,
} from "../user/userAction";

const userSlice = createSlice({
  name: "user",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      // GETALL bienbanhop
      .addCase(fetchAll_User.pending, (state: any) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAll_User.fulfilled, (state: any, action: any) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchAll_User.rejected, (state: any, action: any) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
