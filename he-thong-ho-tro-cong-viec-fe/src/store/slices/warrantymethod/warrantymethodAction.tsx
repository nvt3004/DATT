
import { createAsyncThunk } from "@reduxjs/toolkit";
import { PATHS } from "../../configPath";
import RestClient from "@/config/RestClient";

interface NewDataWarrantyMethod {
    id?: string;
    noiDung: string;
    moTa: string;
    baoHanhId: number; // Thêm thuộc tính baoHanh
}



export const fetchWarrantyMethod = createAsyncThunk<any, { activePage: number, searchValue?: string }>(
    "warrantyMethod/fetchWarrantyMethod",
    async ({ activePage, searchValue }) => {
        try {
            const response = await RestClient.get(
                `${PATHS.WARRANTY_METHOD}?page=${activePage}&size=${searchValue}`
            );

            if (response.status === 200) {
                return response.data;
            }
        } catch (error) {
            throw error;
        }
    }
);

export const addWarrantyMethod = createAsyncThunk(
    "warrantyMethod/addWarrantyMethod",
    async (newDataWarrantyMethod: NewDataWarrantyMethod) => {
        try {
            const response = await RestClient.post(PATHS.WARRANTY_METHOD, newDataWarrantyMethod);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
);

export const updateWarrantyMethod = createAsyncThunk(
    "warrantyMethod/updateWarrantyMethod",
    async (newDataWarrantyMethod: NewDataWarrantyMethod) => {
        try {
            const response = await RestClient.put(PATHS.WARRANTY_METHOD, newDataWarrantyMethod);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
);

export const deleteWarrantyMethod = createAsyncThunk(
    "warrantyMethod/deleteWarrantyMethod",
    async (id: string | number) => {
        await RestClient.del(`${PATHS.WARRANTY_METHOD}?id=${id}`, {
            data: { id }
        });
        return id;
    }
);


