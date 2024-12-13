import { createSlice } from "@reduxjs/toolkit";
import { fetchChucnang } from "./chucnangAction";

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
export interface nhomChucNang {
    id: number;
    ten: string;
    moTa: string;
}


interface Item {
    id: number;
    ten: string;
    moTa: string;
    gia:number;
    nhomChucNang: nhomChucNang[];
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

const chucnangSlice = createSlice({
    name: "chucnang",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // fetch
            .addCase(fetchChucnang.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchChucnang.fulfilled, (state, action: any) => {
                state.loading = false;
                state.items = action.payload;// Cập nhật result
            })
            .addCase(fetchChucnang.rejected, (state: any, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default chucnangSlice.reducer;
