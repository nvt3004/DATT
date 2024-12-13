import { nestApiInstance } from "@/config/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { PATHS } from "../../configPath";

interface NewDataWarranty {
    id?: string;
    mocThoiGian: string;
    moTa: string;
    nguoiDung: number;
    thoiGian: number;
    tuVan: number;
}

// Fetch Warranty
export const fetchWarranty = createAsyncThunk<any, { activePage: number, searchValue?: string }>(
    "warranty/fetchWarranty",
    async ({ activePage, searchValue }) => {
        try {
            const response = await nestApiInstance.get(
                `${PATHS.WARRANTY}?page=${activePage}&size=${searchValue}`
            );

            if (response.status === 200) {
                return response.data;
            }
        } catch (error) {
            throw error;
        }
    }
);

// Add Warranty
export const addWarranty = createAsyncThunk(
    "warranty/addWarranty",
    async (newDataWarranty: NewDataWarranty) => {
        try {
            const response = await nestApiInstance.post(PATHS.WARRANTY, {
                mocThoiGian: newDataWarranty.mocThoiGian,
                moTa: newDataWarranty.moTa,
                nguoiDung: Number(newDataWarranty.nguoiDung),
                thoiGian: Number(newDataWarranty.thoiGian),
                tuVan: Number(newDataWarranty.tuVan)
            });

            return response.data;
        } catch (error) {
            throw error;
        }
    }
);

// Update Warranty
export const updateWarranty = createAsyncThunk(
    "warranty/updateWarranty",
    async (data: string | number) => {
        try {
            const response = await nestApiInstance.put(`${PATHS.WARRANTY}`, data);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
);

// Delete Warranty
export const deleteWarranty = createAsyncThunk(
    "warranty/deleteWarranty",
    async (id: string | number) => {
        await nestApiInstance.delete(`${PATHS.WARRANTY}?id=${id}`, {
            data: { id }
        });
        return id;
    }
);
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
