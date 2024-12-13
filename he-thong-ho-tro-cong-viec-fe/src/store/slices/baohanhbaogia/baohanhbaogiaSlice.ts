import { createSlice } from "@reduxjs/toolkit";
import {  fetchBaoHangBaoGia } from "./baohanhbaogiaAction";

const baohanhbaogiaSlice = createSlice({
    name: "baohanhbaogia",
    initialState: {
        items: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // fetch
            .addCase(fetchBaoHangBaoGia.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBaoHangBaoGia.fulfilled, (state, action: any) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchBaoHangBaoGia.rejected, (state: any, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
         
    },
});


export default baohanhbaogiaSlice.reducer;
