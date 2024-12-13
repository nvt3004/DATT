import { nestApiInstance } from "@/config/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { PATHS } from "../../configPath";

export const fetchWrranty = createAsyncThunk<
    any,
    { activePage: number; searchValue?: string }
>("warranty/fetchWarranty", async ({ activePage, searchValue }) => {
    try {
        const response = await nestApiInstance.get(
            `${PATHS.WARRANTY}?page=${activePage}&size=${searchValue}`
        );
        
        if(response.status === 200) {
            return response.data.result;
        }
    } catch (error) {
        throw error;
    }
});
export const fetchWrrantyDetail = createAsyncThunk<
    any,
    { id:  string  }
>("warranty/fetchWarrantyDetail", async ({ id }) => {
    try {
        const response = await nestApiInstance.get(
            `${PATHS.WARRANTY}/id?baoHanhid=${id}`
        );
        if(response.status === 200) {
            return response.data.result;
        }
    } catch (error) {
        throw error;
    }
});
