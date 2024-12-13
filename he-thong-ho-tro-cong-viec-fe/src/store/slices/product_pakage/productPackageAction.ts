import { createAsyncThunk } from "@reduxjs/toolkit";
import { PATHS } from "../../configPath";
import RestClient from "@/config/RestClient";
interface NewDataProductPackage {
    id?: string;
    ten: string;
    moTa: string;
}

export const fetchProductPackage = createAsyncThunk<
    any,
    { activePage: number; searchValue?: string }
>("productpackage/fetchProductPackage", async ({ activePage, searchValue }) => {
    try {
        const response = await RestClient.get(
            `${PATHS.PRODUCT_PACKAGE}?page=${activePage}&size=${searchValue}`
        );
         
        if(response.status === 200) {
            return response.data.result;
        }
    } catch (error) {
        throw error;
    }
});
export const addProductPackage = createAsyncThunk(
    "productpackage/addProductPackage",
    async (newDataProductPackage: NewDataProductPackage) => {
        try {
            const response = await RestClient.post(
                PATHS.PRODUCT_PACKAGE,
                newDataProductPackage
            );
            return response.data;
        } catch (error) {
            return error;
        }
    }
);

export const updateProductPackage = createAsyncThunk(
    "productpackage/updateProductPackage",
    async (newDataProductPackage: NewDataProductPackage) => {
        try {
          
            const response = await RestClient.put(`${PATHS.PRODUCT_PACKAGE}`, newDataProductPackage);
            return response.data;
        } catch (error) {
            return error;
        }
    }
);

export const deleteProductPackage = createAsyncThunk(
    "productpackage/deleteProductPackage",
    async (id: string | number) => {
        const res = await RestClient.del(`${PATHS.PRODUCT_PACKAGE}?id=${id}`);
        return res;
    }
);
