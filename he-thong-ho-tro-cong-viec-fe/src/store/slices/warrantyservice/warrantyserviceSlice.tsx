import { createSlice } from "@reduxjs/toolkit";
import { fetchWarrantyService } from "./warrantyserviceAction";

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

export interface baohanh {
    id: number;
    moTa: string;
}

interface Item {
    id: number;
    noiDung: string;
    moTa: string;
    baoHanhId: baohanh[];
}


interface DataState {
    id: string | null;
    message: string;
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
    } | null;
    loading: boolean;
    error: string | null;
}

const initialState: DataState = {
    id: null,
    message: "",
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
        first: true,
        last: true,
        numberOfElements: 0,
        size: 0,
        empty: true,
    },
    loading: false,
    error: null,
};

const warrantyServiceSlice = createSlice({
    name: "warrantyService",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchWarrantyService.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchWarrantyService.fulfilled, (state, action: any) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchWarrantyService.rejected, (state: any, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default warrantyServiceSlice.reducer;