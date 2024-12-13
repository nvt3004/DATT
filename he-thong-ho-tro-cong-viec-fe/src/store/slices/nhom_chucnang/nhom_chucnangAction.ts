import { nestApiInstance } from "@/config/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { PATHS } from "../../configPath";

interface NewDataNhom_chucnang {
    id?: string;
    ten: string;
    moTa: string;
    hangMucId: number;
}


interface IEdit_nhomchucnang {
    id?: string;
    ten: string;
    moTa: string;
    hangMucId: number;
}

export const fetchNhom_chucnang = createAsyncThunk<any, { activePage: number, searchValue?: string }>(
    "nhomchucnang/fetchNhom_chucnang",
    async ({ activePage, searchValue }) => {
        try {
            const response = await nestApiInstance.get(
                `${PATHS.NHOMCHUCNANG}?page=${activePage}&size=${searchValue}` 
            );

            if (response.status === 200) {
                return response.data;
            }
        } catch (error) {
            throw error;
        }
    }
);

export const addNhom_chucnang = createAsyncThunk(
    "nhomchucnang/addNhom_chucnang",
    async (newDataNhom_chucnang: NewDataNhom_chucnang) => {
        try {
            const response = await nestApiInstance.post(PATHS.NHOMCHUCNANG, newDataNhom_chucnang);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
);
export const addNhom_chucnangTacNhan = createAsyncThunk(
    "nhomchucnang/addNhom_chucnang",
    async (newDataNhom_chucnang: any) => {
        try {
            const response = await nestApiInstance.post(PATHS.NHOMCHUCNANGTACNHAN, newDataNhom_chucnang);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
);

export const updateNhom_chucnang = createAsyncThunk(
    "nhomchucnang/updateNhom_chucnang",
    async (newDataNhom_chucnang: IEdit_nhomchucnang) => {
        try {
            const response = await nestApiInstance.put(PATHS.NHOMCHUCNANG, newDataNhom_chucnang);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
);


export const deleteNhom_chucnang = createAsyncThunk(
    "nhomchucnang/deleteNhom_chucnang",
    async (id: string | number) => {
        await nestApiInstance.delete(`${PATHS.NHOMCHUCNANG}?id=${id}`, {
            data: { id }
        });
        return id;
    }
);

