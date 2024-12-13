import { nestApiInstance } from "@/config/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { PATHS } from "../../configPath";

interface NewDataWarrantyTerms {
    id?: string;
    noiDung: string;
    moTa: string;
    baoHanhId: number; // Thêm thuộc tính thoiHanBaoHanh
}

export const fetchWarrantyTerm = createAsyncThunk<any, { activePage: number, searchValue?: string }>(
    "warrantyTerm/fetchWarrantyTerm",
    async ({ activePage, searchValue }) => {
        try {
            const response = await nestApiInstance.get(
                `${PATHS.WARRANTY_TERMS}?page=${activePage}&size=${searchValue}`
            );

            if (response.status === 200) {
                return response.data;
            }
        } catch (error) {
            throw error;
        }
    }
);

export const addWarrantyTerm = createAsyncThunk(
    "warrantyTerm/addWarrantyTerm",
    async (newDataWarrantyTerms: NewDataWarrantyTerms) => {
        try {
            const response = await nestApiInstance.post(PATHS.WARRANTY_TERMS, newDataWarrantyTerms);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
);

export const updateWarrantyTerm = createAsyncThunk(
    "warrantyTerm/updateWarrantyTerm",
    async (newDataWarrantyTerms: NewDataWarrantyTerms) => {
        try {
            const response = await nestApiInstance.put(PATHS.WARRANTY_TERMS, newDataWarrantyTerms);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
);

export const deleteWarrantyTerm = createAsyncThunk(
    "warrantyTerm/deleteWarrantyTerm",
    async (id: string | number) => {
        await nestApiInstance.delete(`${PATHS.WARRANTY_TERMS}?id=${id}`, {
            data: { id }
        });
        return id;
    }
);
