import { createSlice } from "@reduxjs/toolkit";

import { fetchWrranty } from "./warrantyAction";


const wrrantySlice = createSlice({
    name: "wrranty",
    initialState:  {
        items: [],
        loading: false,
        error: null,
      },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // fetch
            .addCase(fetchWrranty.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchWrranty.fulfilled, (state, action: any) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchWrranty.rejected, (state: any, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default wrrantySlice.reducer;