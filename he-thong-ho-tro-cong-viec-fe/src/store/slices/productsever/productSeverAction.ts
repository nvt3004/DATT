import { createAsyncThunk } from "@reduxjs/toolkit";
import { PATHS } from "../../configPath";
import RestClient from "@/config/RestClient";

export const fetchProductSever = createAsyncThunk<any, { activePage: number, searchValue?: string }>(
    "productsever/fetchProductSever",
    async ({ activePage, searchValue })  => {
        try {
            
            const response = await RestClient.get(`${PATHS.PRODUCTSEVER}?page=${activePage}&size=${searchValue}`);
            
            if (response.status === 200) {
                return response.data
            }
        } catch (error) {
            throw error;
        }
    }
);



export const addProductSever = createAsyncThunk("productsever/addProductSever", async (newDataProductSever: any) => {
    try {
        const response = await RestClient.post(PATHS.PRODUCTSEVER, newDataProductSever);
        
        return response.data;
    } catch (error) {
        throw error;
    }
});
export const addProductSeverList = createAsyncThunk("productsever/addProductSever", async (newDataProductSever: any) => {
    try {
        const response = await RestClient.post(`${PATHS.PRODUCTSEVER}/list`, newDataProductSever);
        
        return response.data;
    } catch (error) {
        throw error;
    }
});
export const addProductSeverDetail = createAsyncThunk("productsever/addProductSeverDetail", async (newDataProductSever: any) => {
    try {
        const response = await RestClient.post(PATHS.PRODUCTSEVER, newDataProductSever);
        
        return response.data;
    } catch (error) {
        throw error;
    }
});
export const deleteProductSever = createAsyncThunk(
    "ProductSever/deleteProductSever",
    async (id: string | number) => {
        const res = await RestClient.del(`${PATHS.PRODUCTSEVER}?id=${id}`);
        return res;
    }
);
