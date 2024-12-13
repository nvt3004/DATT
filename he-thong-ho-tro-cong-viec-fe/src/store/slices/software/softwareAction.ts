import { nestApiInstance } from "@/config/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { PATHS } from "../../configPath";
import RestClient from "@/config/RestClient";

interface NewDataSoftware {
    id?: string;
    ten: string;
    moTa: string;
}
export const fetchSoftware = createAsyncThunk<
    any,
    { activePage: number; searchValue?: string }
>("software/fetchsoftware", async ({ activePage, searchValue }) => {
    try {
        const response = await RestClient.get(
            `${PATHS.SOFTWARE_SYSTEM}?page=${activePage}&size=${searchValue}`
        );
        
        if(response.status === 200) {
            return response.data.result;
        }
    } catch (error) {
        throw error;
    }
});
export const addSoftware = createAsyncThunk(
    "software/addSoftware",
    async (newDataSoftware: NewDataSoftware) => {
        try {
            const response = await RestClient.post(`${PATHS.SOFTWARE_SYSTEM}` , newDataSoftware);
            
            if (response.status === 201) {
                return response.data;
            }
        } catch (error) {
            return error;
        }
    }
);
export const editSoftware = createAsyncThunk(
    "software/editSoftware",
    async (newDataSoftware: NewDataSoftware) => {
        try {
            const response = await RestClient.put(`${PATHS.SOFTWARE_SYSTEM}` , newDataSoftware);
            if (response.status === 200) {
                return response.data;
            }
        } catch (error) {
            return error;
        }
    }
);
export const deleteSoftware = createAsyncThunk(
    "software/deleteSoftware",
    async (id: string | number) => {
        try {
            const response = await RestClient.del(`${PATHS.SOFTWARE_SYSTEM}?id=${id}`);
            return response
        } catch (error) {
            return error;
        }
    }
);