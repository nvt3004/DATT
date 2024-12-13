import { createAsyncThunk } from "@reduxjs/toolkit";
import { PATHS } from "../../configPath";
import RestClient from "@/config/RestClient";

export const fetchproductCategorys = createAsyncThunk<any, { activePage: number, searchValue?: string }>(
    "productCategorys/fetchproductCategorysSlice",
    async ({ activePage, searchValue })  => {
        try {
            
            const response = await RestClient.get(`${PATHS.PRODUCTCATEGORYS}?page=${activePage}&size=${searchValue}`);
            
            if (response.status === 200) {
                return response.data
            }
        } catch (error) {
            throw error;
        }
    }
);
export const fetchproductCategorysDetail = createAsyncThunk(
    "productCategorys/fetchproductCategorysSlice",
    async (id : string | number)  => {
        try {
            
            const response = await RestClient.get(`${PATHS.PRODUCTCATEGORYS}/id?id=${id}`);
            
            if (response.status === 200) {
                return response.data
            }
        } catch (error) {
            throw error;
        }
    }
);


export const addproductCategorys = createAsyncThunk("productCategorys/addproductCategorys", async (newDataproductCategorys: any) => {
    try {
        const response = await RestClient.post(PATHS.PRODUCTCATEGORYS, newDataproductCategorys);
        
        return response.data;
    } catch (error) {
        throw error;
    }
});
export const editproductCategorys = createAsyncThunk("productCategorys/addproductCategorys", async (newdata: any) => {
    try {
        
        const response = await RestClient.put(PATHS.PRODUCTCATEGORYS, newdata);
        
        return response.data;
    } catch (error) {
        throw error;
    }
});
export const deleteproductCategorys = createAsyncThunk(
    "productCategorys/deleteproductCategorysSlice",
    async (id: string | number) => {
        const res = await RestClient.del(`${PATHS.PRODUCTCATEGORYS}?id=${id}`);
        return res;
    }
);
