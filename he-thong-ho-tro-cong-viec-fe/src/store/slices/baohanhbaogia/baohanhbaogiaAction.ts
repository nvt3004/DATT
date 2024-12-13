import { nestApiInstance } from "@/config/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { PATHS } from "../../configPath";
import RestClient from "@/config/RestClient";
interface NewDataPay {
    id?: string;
    ten: string;
    moTa: string;
  }
  
export const fetchBaoHangBaoGia = createAsyncThunk<any, { activePage: number, searchValue?: string }>(
    "baohanhbaogia/fetchBaoHangBaoGia",
    async ({ activePage, searchValue })  => {
        try {
            
            const response = await RestClient.get(`${PATHS.BAOHANHBAOGIA}?page=${activePage}&size=${searchValue}`);

            if (response.data.code === 1000) {
                return response.data
            }
        } catch (error) {
            throw error;
        }
    }
);
export const addBaohanhbaogia = createAsyncThunk(
    "Baohanhbaogia/addBaohanhbaogia",
    async (newDataBaohanhbaogia: any) => {
        try {
            const response = await RestClient.post(
                PATHS.BAOHANHBAOGIA,
                newDataBaohanhbaogia
            );

            return response.data;
        } catch (error) {
            return error;
        }
    }
);
export const addBaogiakhachhang = createAsyncThunk(
    "Baohanhbaogia/baogiakhachhang",
    async (newDataBaogiakhachhang: any) => {
        try {
            const response = await RestClient.post(
                PATHS.BAOGIAKHACHHANG,
                newDataBaogiakhachhang
            );

            return response.data;
        } catch (error) {
            return error;
        }
    }
);
export const addTuVanBaoGia = createAsyncThunk(
    "Baohanhbaogia/addTuvanBaoGia",
    async (newDataTuVanBaoGia: any) => {
        try {
            const response = await RestClient.post(
                PATHS.TUVANBAOHANH,
                newDataTuVanBaoGia
            );

            return response.data;
        } catch (error) {
            return error;
        }
    }
);
export const addSanPhamBaoGia = createAsyncThunk(
    "sanphambaogia/addsanphambaogia",
    async (newDataProductQuote: any) => {
        try {
            const response = await RestClient.post(
                PATHS.PRODUCTQUOTE,
                newDataProductQuote
            );

            return response.data;
        } catch (error) {
            return error;
        }
    }
);
