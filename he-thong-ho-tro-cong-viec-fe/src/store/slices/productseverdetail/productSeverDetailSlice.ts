import { createSlice } from "@reduxjs/toolkit";

import { fetchProductSeverDetail, fetchProductSeverDetailById } from "./productSeverDetailAction";


const productSeverDetailSlice = createSlice({
    name: "productseverdetail",
    initialState:  {
        items: [],
        loading: false,
        error: null,
      },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // fetch
            .addCase(fetchProductSeverDetail.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProductSeverDetail.fulfilled, (state, action: any) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchProductSeverDetail.rejected, (state: any, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchProductSeverDetailById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProductSeverDetailById.fulfilled, (state, action: any) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchProductSeverDetailById.rejected, (state: any, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default productSeverDetailSlice.reducer;
