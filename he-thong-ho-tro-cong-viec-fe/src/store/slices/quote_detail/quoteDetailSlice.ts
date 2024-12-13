import { createSlice } from "@reduxjs/toolkit";

import { fetchQuoteDetail } from "./quoteDetailAction";

const quoteDetailSlice = createSlice({
    name: "quotedetail",
    initialState: {
        items: [],
        loading: false,
        error: null,
        idPhanmem: null,
        idPhangmuc: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // fetch
            .addCase(fetchQuoteDetail.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchQuoteDetail.fulfilled, (state, action: any) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchQuoteDetail.rejected, (state: any, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default quoteDetailSlice.reducer;
