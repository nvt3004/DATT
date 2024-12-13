import { createSlice } from "@reduxjs/toolkit";

// import { fetchSoftware } from "./techologycateAction";

const techologycateSlice = createSlice({
    name: "techologycate",
    initialState: {
        items: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder;
    },
});

export default techologycateSlice.reducer;
