import { createAsyncThunk } from "@reduxjs/toolkit";
import { PATHS } from "../../configPath";
import RestClient from "@/config/RestClient";

export const fetchProductSeverDetail = createAsyncThunk<any, { activePage: number, searchValue?: string }>(
    "productseverdetail/fetchProductSeverDetail",
    async ({ activePage, searchValue })  => {
        try {
            
            const response = await RestClient.get(`${PATHS.PRODUCTSEVERDETAIL}?page=${activePage}&size=${searchValue}`);
            
            if (response.status === 200) {
                return response.data
            }
        } catch (error) {
            throw error;
        }
    }
);


export const addProductSeverDetail = createAsyncThunk("productsever/addProductSeverDetail", async (newDataProductSever: any) => {
    try {
        const response = await RestClient.post(PATHS.PRODUCTSEVERDETAIL, newDataProductSever);
        return response.data;
    } catch (error) {
        throw error;
    }
});
export const deleteProductSeverDetail = createAsyncThunk(
    "ProductSeverDetail/deleteProductSeverDetail",
    async (id: string | number) => {
        const res = await RestClient.del(`${PATHS.PRODUCTSEVERDETAIL}?id=${id}`);
        return res;
    }
);

export const fetchProductSeverDetailById = createAsyncThunk(
    "productseverdetailById/fetchProductSeverDetailById",
    async (id: string | number) => {
        const res = await RestClient.get(`${PATHS.PRODUCTSEVERDETAIL}/id?id=${id}`);
        if (res.status === 200) {
            return res.data
        }
    }
  );
  export const EditProductSeverDetail = createAsyncThunk("productsever/EditProductSeverDetail", async (newDataProductSever: any) => {
    try {
        
        const response = await RestClient.put(PATHS.PRODUCTSEVERDETAIL, newDataProductSever);
        
        return response.data;
    } catch (error) {
        throw error;
    }
});