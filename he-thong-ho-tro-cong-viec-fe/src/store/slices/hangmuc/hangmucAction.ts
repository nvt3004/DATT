
import { createAsyncThunk } from "@reduxjs/toolkit";
import { PATHS } from "../../configPath";
import RestClient from "@/config/RestClient";

interface NewDataHangmuc {
    id?: string;
    ten: string;
    gia?: number;
    soLuong?: number;
    moTa: string;
    donViTinhId: number;
}

interface add_hangmuc {
    id?: string;
    ten: string;
    gia?: number;
    soLuong?: number;
    moTa: string;
    donViTinhId: number;
}

// Fetch Hangmuc
export const fetchHangmuc = createAsyncThunk<any, { activePage: number, searchValue?: string }>(
    "hangmuc/fetchHangmuc",
    async ({ activePage, searchValue }) => {
        try {
            const response = await RestClient.get(
                `${PATHS.HANGMUC_PM}?page=${activePage}&size=${searchValue}`
            );

            if (response.status === 200) {
                return response.data;
            }
        } catch (error) {
            throw error;
        }
    }
);


export const addHangmuc = createAsyncThunk(
    "hangmuc/addHangmuc",
    async (newDataHangmuc: add_hangmuc) => {
        try {
            const response = await RestClient.post(PATHS.HANGMUC_PM, {
                ten: newDataHangmuc.ten,
                gia: newDataHangmuc.gia,
                soLuong: Number(newDataHangmuc.soLuong),
                moTa: newDataHangmuc.moTa,
                donViTinhId: Number(newDataHangmuc.donViTinhId)
            });

            return response.data;
        } catch (error) {
            throw error;
        }
    }
);

// Update Hangmuc
export const updateHangmuc = createAsyncThunk(
    "hangmuc/updateHangmuc",
    async (data: NewDataHangmuc) => {
        try {
            const response = await RestClient.put(`${PATHS.HANGMUC_PM}`, data);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
);

// Delete Hangmuc
export const deleteHangmuc = createAsyncThunk(
    "hangmuc/deleteHangmuc",
    async (id: string | number) => {
        await RestClient.del(`${PATHS.HANGMUC_PM}?id=${id}`, {
            data: { id }
        });
        return id;
    }
);
