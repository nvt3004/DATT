
import { createAsyncThunk } from "@reduxjs/toolkit";
import { PATHS } from "../../configPath";
import RestClient from "@/config/RestClient";

interface NewDataChucnang {
    ten: string;
    moTa: string;
    gia: number;
    nhomChucNangId: number;
}

interface edit_nhomchucnang {
    ten: string;
    moTa: string;
    gia: number;
    nhomChucNangId: number;
}

export const fetchChucnang = createAsyncThunk<any, { activePage: number, searchValue?: string }>(
    "chucnang/fetchChucnang",
    async ({ activePage, searchValue }) => {
        try {
            const response = await RestClient.get(
                `${PATHS.CHUCNANG}?page=${activePage}&size=${searchValue}`);

            return response.data;
        } catch (error) {
            throw error;
        }
    }
);

export const addChucnang = createAsyncThunk(
    "chucnang/addChucnang",
    async (newDataChucnang: NewDataChucnang) => {
        try {
            const response = await RestClient.post(PATHS.CHUCNANG, {
                ten: newDataChucnang.ten,
                moTa: newDataChucnang.moTa,
                gia: Number(newDataChucnang.gia),
                nhomChucNangId: Number(newDataChucnang.nhomChucNangId)
            });

            return response.data;
        } catch (error) {
            throw error;
        }
    }
);
export const updateChucnang = createAsyncThunk(
    "chucnang/updateChucnang",
    async (newDataChucnang: edit_nhomchucnang) => {
        try {
            const response = await RestClient.put(PATHS.CHUCNANG, newDataChucnang);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
);


export const deleteChucnang = createAsyncThunk(
    "chucnang/deleteChucnang",
    async (id: string | number) => {
        await RestClient.del(`${PATHS.CHUCNANG}?id=${id}`, {
            data: { id }
        });
        return id;
    }
);

