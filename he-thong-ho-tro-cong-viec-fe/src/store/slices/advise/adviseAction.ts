import { createAsyncThunk } from "@reduxjs/toolkit";
import { PATHS } from "../../configPath";
import RestClient from "@/config/RestClient";
interface NewDataAdvise {
    id?: string;
    ten: string;
    soDienThoai: string;
    email: string;
    danhXungId: string | number;
}

export const fetchAdvise = createAsyncThunk<
    any,
    { activePage: number; searchValue?: string }
>("advise/fetchAdise", async ({ activePage, searchValue }) => {
    try {
        const response = await RestClient.get(
            `${PATHS.ADVISE}?page=${activePage}&size=${searchValue}`
        );
        
        if(response.status === 200) {
            return response.data.result;
        }
    } catch (error) {
        throw error;
    }
});


export const addAdvise = createAsyncThunk(
    "advise/addAdvise",
    async (newDataAdvise: NewDataAdvise) => {
        try {
            const response = await RestClient.post(
                PATHS.ADVISE,
                newDataAdvise
            );

            return response.data;
        } catch (error) {
            return error;
        }
    }
);

export const updateAdvise = createAsyncThunk(
    "advise/updateAdvise",
    async (newDataAdvise: NewDataAdvise) => {
        try {
          
            const response = await RestClient.put(`${PATHS.ADVISE}`, newDataAdvise);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
);

export const deleteAdvise = createAsyncThunk(
    "advise/deleteAdvise",
    async (id: string | number) => {
        const res = await RestClient.del(`${PATHS.ADVISE}?id=${id}`);
        return res;
    }
);
