import { createSlice } from "@reduxjs/toolkit";

import { fetchCategory } from "./categoryAction";

const categorySlice = createSlice({
    name: "category",
    initialState: {
        items: [],
        loading: false,
        error: null,
    },
    reducers: { },
    extraReducers: (builder) => {
        builder
            // fetch
            .addCase(fetchCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCategory.fulfilled, (state, action: any) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchCategory.rejected, (state: any, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default categorySlice.reducer;
