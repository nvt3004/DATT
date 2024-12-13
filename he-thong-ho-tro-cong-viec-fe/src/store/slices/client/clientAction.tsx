import { createAsyncThunk } from "@reduxjs/toolkit";
import { PATHS } from "../../configPath";
import RestClient from "@/config/RestClient";

interface Customer {
    id?: string;
    ten: string;
    moTa: string;
    danhXung: string | number;
}

// Fetch danh sách khách hàng
export const fetchCustomer = createAsyncThunk<
    any,
    { activePage: number; searchValue?: string }
>(
    "customer/fetchCustomer",
    async ({ activePage, searchValue }) => {
        try {
            const response = await RestClient.get(
                `${PATHS.CUSTOMERS}?page=${activePage}&size=${searchValue}`
            );
            
            if (response.status === 200) {
                return response.data.result;
            }
        } catch (error) {
            throw error;
        }
    }
);

// Thêm khách hàng mới
export const addCustomer = createAsyncThunk(
    "customer/addCustomer",
    async (newCustomer: Customer) => {
        try {
            const response = await RestClient.post(PATHS.CUSTOMERS, newCustomer);
            return response.data;
        } catch (error) {
            console.error("Error adding customer:", error);
            throw error;
        }
    }
);

// Cập nhật thông tin khách hàng
export const updateCustomer = createAsyncThunk(
    "customer/updateCustomer",
    async (updatedCustomer: Customer) => {
        try {
            const response = await RestClient.put(`${PATHS.CUSTOMERS}`, updatedCustomer);
            return response.data;
        } catch (error) {
            console.error("Error updating customer:", error);
            throw error;
        }
    }
);

// Xóa khách hàng
export const deleteCustomer = createAsyncThunk(
    "customer/deleteCustomer",
    async (id: string | number) => {
        const res = await RestClient.del(`${PATHS.CUSTOMERS}?id=${id}`);
        return res;
    }
)