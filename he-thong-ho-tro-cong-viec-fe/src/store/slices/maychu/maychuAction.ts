
import { createAsyncThunk } from "@reduxjs/toolkit";
import { PATHS } from "../../configPath";
import RestClient from "@/config/RestClient";

interface NewDataMaychu {
    id?: string;
    ten: string;
    moTa: string;
}

export const fetchMaychu = createAsyncThunk<any, { activePage: number, searchValue?: string }>(
    "maychu/fetchMaychu",
    async ({ activePage, searchValue }) => {
        try {
            const response = await RestClient.get(
                `${PATHS.MAYCHU}?page=${activePage}&size=${searchValue}`
            );

            if (response.status === 200) {
                return response.data;
            }
        } catch (error) {
            throw error;
        }
    }
);

export const addMaychu = createAsyncThunk("maychu/addMaychu", async (newDataMaychu: NewDataMaychu) => {
    try {
        const response = await RestClient.post(PATHS.MAYCHU, newDataMaychu);

        return response.data;
    } catch (error) {
        throw error;
    }
});

export const updateMaychu = createAsyncThunk(
    "maychu/updateMaychu",
    async (newDataMaychu: NewDataMaychu) => {
        try {
            const response = await RestClient.put(PATHS.MAYCHU, newDataMaychu);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
);

export const deleteMaychu = createAsyncThunk(
    "maychu/deleteMaychu",
    async (id: string | number) => {
        await RestClient.del(`${PATHS.MAYCHU}/id?id=${id}`, {
            data: { id }
        });
        return id;
    }
);

