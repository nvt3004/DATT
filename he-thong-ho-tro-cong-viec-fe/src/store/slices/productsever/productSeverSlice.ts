import { createSlice } from "@reduxjs/toolkit";

import { fetchProductSever } from "./productSeverAction";


const productSeverSlice = createSlice({
    name: "productsever",
    initialState:  {
        items: [],
        loading: false,
        error: null,
      },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // fetch
            .addCase(fetchProductSever.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProductSever.fulfilled, (state, action: any) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchProductSever.rejected, (state: any, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default productSeverSlice.reducer;
