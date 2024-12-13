
import { createAsyncThunk } from "@reduxjs/toolkit";
import { PATHS } from "../../configPath";
import RestClient from "@/config/RestClient";

interface NewDataThongso {
    id?: string;
    ma: string;
    ten: string;
    moTa: string;
}

export const fetchThongsogr = createAsyncThunk<any, { activePage: number, searchValue?: string }>(
    "thongsogroup/fetchThongsogr",
    async ({ activePage, searchValue }) => {
        try {
            const response = await RestClient.get(
                `${PATHS.GR_THONGSO}?page=${activePage}&size=${searchValue}` // Cập nhật kích thước trang mặc định nếu searchValue không có
            );

            if (response.status === 200) {
                return response.data;
            }
        } catch (error) {
            throw error;
        }
    }
);

export const addThongsogr = createAsyncThunk("thongsogroup/addThongsogr", async (newDataThongso: NewDataThongso) => {
    try {
        const response = await RestClient.post(PATHS.GR_THONGSO, newDataThongso);

        return response.data;
    } catch (error) {
        throw error;
    }
});

export const updateThongsogr = createAsyncThunk(
    "thongsogroup/updateThongsogr",
    async (newDataThongso: NewDataThongso) => {
        try {
            const response = await RestClient.put(PATHS.GR_THONGSO, newDataThongso);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
);


export const deleteThongsogr = createAsyncThunk(
    "thongsogroup/deleteThongsogr",
    async (id: string | number) => {
        await RestClient.del(`${PATHS.GR_THONGSO}?id=${id}`, {
            data: { id }
        });
        return id;
    }
);

