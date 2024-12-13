
import { createAsyncThunk } from "@reduxjs/toolkit";
import { PATHS } from "../../configPath";
import RestClient from "@/config/RestClient";

interface NewDataDonViTinh {
    id?: string;
    ten: string;
    moTa: string;
}

export const fetchDonViTinh = createAsyncThunk<any, { activePage: number, searchValue?: string }>(
    "donvitinh/fetchDonViTinh ",
    async ({ activePage, searchValue }) => {
        try {
            const response = await RestClient.get(
                `${PATHS.DONVITINH}?page=${activePage}&size=${searchValue}`
            );

            if (response.status === 200) {
                return response.data;
            }
        } catch (error) {
            throw error;
        }
    }
);

export const addDonViTinh = createAsyncThunk("donvitinh/addDonViTinh ", async (newDataDonViTinh: NewDataDonViTinh) => {
    try {
        const response = await RestClient.post(PATHS.DONVITINH, newDataDonViTinh);

        return response.data;
    } catch (error) {
        throw error;
    }
});

export const updateDonViTinh = createAsyncThunk(
    "donvitinh/updateDonViTinh ",
    async (newDataDonViTinh: NewDataDonViTinh) => {
        try {
            const response = await RestClient.put(PATHS.DONVITINH, newDataDonViTinh);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
);

export const deleteDonViTinh = createAsyncThunk(
    "donvitinh/deleteDonViTinh ",
    async (id: string | number) => {
        await RestClient.del(`${PATHS.DONVITINH}?id=${id}`, {
            data: { id }
        });
        return id;
    }
);

