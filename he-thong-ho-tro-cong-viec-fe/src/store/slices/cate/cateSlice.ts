import { createSlice } from "@reduxjs/toolkit";

import { fetchCate } from "./cateAction";

interface Pageable {
    offset: number;
    pageNumber: number;
    pageSize: number;
    totalPages: number;
    totalElements: number;
    numberOfElements: number;
    last: boolean;
    first: boolean;
    size: number;
    sort: {
        empty: boolean;
        sorted: boolean;
        unsorted: boolean;
    };
    paged: boolean;
    unpaged: boolean;
}
interface Item {
    sodienthoai: string;
    danhxung: {
        id: number;
        ten: string;
        moTa: string;
        loai: number;
    };
    ten: string;
    email: string;
    tuvan_id: number;
}

interface DataState {
    items: {
        content: Item[];
        pageable: Pageable;
        totalElements: number;
        totalPages: number;
        number: number;
        first: boolean;
        last: boolean;
        numberOfElements: number;
        size: number;
        empty: boolean;
        sort: any;
    } | null;
    loading: boolean;
    error: string | null;
}
const initialState: DataState = {
    items: {
        content: [],
        pageable: {
            offset: 0,
            pageNumber: 0,
            pageSize: 0,
            totalPages: 0,
            totalElements: 0,
            numberOfElements: 0,
            last: true,
            first: true,
            size: 0,
            sort: {
                empty: true,
                sorted: true,
                unsorted: true,
            },
            paged: true,
            unpaged: true,
        },
        totalElements: 0,
        totalPages: 0,
        number: 0,
        first: false,
        last: false,
        numberOfElements: 0,
        size: 0,
        empty: true,
        sort: null,
    },
    loading: false,
    error: null,
};

const cateSlice = createSlice({
    name: "cate",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // fetch
            .addCase(fetchCate.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCate.fulfilled, (state, action: any) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchCate.rejected, (state: any, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default cateSlice.reducer;
