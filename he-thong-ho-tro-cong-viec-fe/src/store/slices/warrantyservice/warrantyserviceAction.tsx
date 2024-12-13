import { nestApiInstance } from "@/config/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { PATHS } from "../../configPath";

interface NewDataWarrantyService {
    id?: string;
    noiDung: string;
    baoHanhId: number;
}

export const fetchWarrantyService = createAsyncThunk<any, { activePage: number, searchValue?: string }>(
    "warrantyService/fetchWarrantyService",
    async ({ activePage, searchValue }) => {
        try {
            const response = await nestApiInstance.get(
                `${PATHS.WARRANTY_SERVICE}?page=${activePage}&size=${searchValue}`
            );

            if (response.status === 200) {
                return response.data;
            }
        } catch (error) {
            throw error;
        }
    }
);

export const addWarrantyService = createAsyncThunk(
    "warrantyService/addWarrantyService",
    async (newDataWarrantyService: NewDataWarrantyService) => {
        try {
            const response = await nestApiInstance.post(PATHS.WARRANTY_SERVICE, newDataWarrantyService);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
);

export const updateWarrantyService = createAsyncThunk(
    "warrantyService/updateWarrantyService",
    async (newDataWarrantyService: NewDataWarrantyService) => {
        try {
            const response = await nestApiInstance.put(PATHS.WARRANTY_SERVICE, newDataWarrantyService);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
);

export const deleteWarrantyService = createAsyncThunk(
    "warrantyService/deleteWarrantyService",
    async (id: string | number) => {
        await nestApiInstance.delete(`${PATHS.WARRANTY_SERVICE}?id=${id}`, {
            data: { id }
        });
        return id;
    }
);