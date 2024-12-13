import { createAsyncThunk } from "@reduxjs/toolkit";
import { PATHS } from "../../configPath";
import RestClient from "@/config/RestClient";

export const fetchPackage = createAsyncThunk<
    any,
    { activePage: number; searchValue?: string }
>("package/fetchPackage", async ({ activePage, searchValue }) => {
    try {
        const response = await RestClient.get(
            `${PATHS.PRODUCT}?page=${activePage}&size=${searchValue}`
        );

        if (response.status === 200) {
            return response.data.result;
        }
    } catch (error) {
        throw error;
    }
});

export const addPackage  = createAsyncThunk("package/addPackage", async (newData: any) => {
    try {
        const response = await RestClient.post(PATHS.PRODUCT, newData);
        
        return response.data;
    } catch (error) {
        throw error;
    }
});
export const updateProduct = createAsyncThunk(
    "package/updatePackage",
    async (newData: any) => {
        try {
          
            const response = await RestClient.put(`${PATHS.PRODUCT}`, newData);
            return response.data;
        } catch (error) {
            return error;
        }
    }
);
export const deleteackage = createAsyncThunk(
    "maychu/deletePackage",
    async (id: string | number) => {
        await RestClient.del(`${PATHS.PRODUCT}?id=${id}`, {
            data: { id }
        });
        return id;
    }
);

