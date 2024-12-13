import { createSlice } from "@reduxjs/toolkit";
import {
    fetchData_Content_new,
} from "../content_new/content_newAction";

const Content_newSlice = createSlice({
    name: "report",
    initialState: {
        items: [],
        loading: false,
        error: null,
    },
    reducers: {},

    extraReducers: (builder) => {
        builder
            // GETALL
            .addCase(fetchData_Content_new.pending, (state: any) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchData_Content_new.fulfilled, (state: any, action: any) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchData_Content_new.rejected, (state: any, action: any) => {
                state.loading = false;
                state.error = action.error.message;
            });

    }
});

export default Content_newSlice.reducer;
