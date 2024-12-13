
import { createAsyncThunk } from "@reduxjs/toolkit";
import { PATHS } from "../../configPath";
import RestClient from "@/config/RestClient";

interface NewDataThongso {
    id?: string;
    ma: string;
    ten: string;
    moTa: string;
}

export const fetchThongso = createAsyncThunk<any, { activePage: number, searchValue?: string }>(
    "thongso/fetchThongso",
    async ({ activePage, searchValue }) => {
        try {
            const response = await RestClient.get(
                `${PATHS.THONGSO_PM}?page=${activePage}&size=${searchValue}` // Cập nhật kích thước trang mặc định nếu searchValue không có
            );

            if (response.status === 200) {
                return response.data;
            }
        } catch (error) {
            throw error;
        }
    }
);

export const addThongso = createAsyncThunk("thongso/addThongso", async (newDataThongso: NewDataThongso) => {
    try {
        const response = await RestClient.post(PATHS.THONGSO_PM, newDataThongso);

        return response.data;
    } catch (error) {
        throw error;
    }
});

export const updateThongso = createAsyncThunk(
    "thongso/updateThongso",
    async (newDataThongso: NewDataThongso) => {
        try {
            const response = await RestClient.put(PATHS.THONGSO_PM, newDataThongso);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
);


export const deleteThongso = createAsyncThunk(
    "thongso/deleteThongso",
    async (id: string | number) => {
        await RestClient.del(`${PATHS.THONGSO_PM}?id=${id}`, {
            data: { id }
        });
        return id;
    }
);

