import { createSlice } from "@reduxjs/toolkit";

import { fetchproductCategorys } from "./productcategorysAction";


const productCategorysSlice = createSlice({
    name: "productcategorys",
    initialState:  {
        items: [],
        loading: false,
        error: null,
      },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // fetch
            .addCase(fetchproductCategorys.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchproductCategorys.fulfilled, (state, action: any) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchproductCategorys.rejected, (state: any, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default productCategorysSlice.reducer;
