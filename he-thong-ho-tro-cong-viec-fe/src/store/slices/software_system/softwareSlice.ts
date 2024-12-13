import { createSlice } from "@reduxjs/toolkit";

import { fetchSoftware } from "./softwareAction";

const softwareSlice = createSlice({
    name: "software",
    initialState: {
        items: [],
        loading: false,
        error: null,
    },
    reducers: { },
    extraReducers: (builder) => {
        builder
            // fetch
            .addCase(fetchSoftware.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSoftware.fulfilled, (state, action: any) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchSoftware.rejected, (state: any, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default softwareSlice.reducer;
