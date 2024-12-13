import { createAsyncThunk } from "@reduxjs/toolkit";

import { PATHS } from "../../configPath";
import RestClient from "@/config/RestClient";


export const fetchPhanMem_TSKT = createAsyncThunk<any, { activePage: number, searchValue?: string }>(
    "sanphamtskt/fetchPhanmem_tskt",
    async ({ activePage, searchValue }) => {
        try {
            const response = await RestClient.get(
                `${PATHS.PHANMEM_TSKT}?page=${activePage}&size=${searchValue}`
            );

            if (response.status === 200) {
                return response.data;
            }
        } catch (error) {
            throw error;
        }
    }
);
