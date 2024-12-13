import { nestApiInstance } from "@/config/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { PATHS } from "../../configPath";
import RestClient from "@/config/RestClient";
interface NewDataPay {
    id?: string;
    ten: string;
    moTa: string;
  }
  
export const fetchPay = createAsyncThunk<any, { activePage: number, searchValue?: string }>(
    "pay/fetchPay",
    async ({ activePage, searchValue })  => {
        try {
            
            const response = await RestClient.get(`${PATHS.PAYMENT}?page=${activePage}&size=${searchValue}`);

            if (response.data.code === 1000) {
                return response.data
            }
        } catch (error) {
            throw error;
        }
    }
);

export const addPay = createAsyncThunk("pay/addPay", async (newDataPay: NewDataPay) => {
    try {
        const response = await RestClient.post(PATHS.PAYMENT, newDataPay);
        return response.data;
    } catch (error) {
        throw error;
    }
});

export const updatePay = createAsyncThunk(
    "pay/updatePay",
    async (dataUpdatePay: NewDataPay) => {
        try {
            const id : string | undefined  = dataUpdatePay.id;
            const converData = {
                ten: dataUpdatePay.ten ,
                moTa: dataUpdatePay.moTa
            }
            const response = await RestClient.put(`${PATHS.PAYMENT}?id=${id}`, converData);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
);

export const deletePay = createAsyncThunk(
    "pay/deletePay",
    async (id: string | number) => {
        await RestClient.del(`${PATHS.PAYMENT}?id=${id}`);
        return id;
    }
);
