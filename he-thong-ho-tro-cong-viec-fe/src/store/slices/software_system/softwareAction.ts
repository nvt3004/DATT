import { nestApiInstance } from "@/config/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { PATHS } from "../../configPath";

export const fetchSoftware = createAsyncThunk<
    any
>("software/fetchsoftware", async () => {
    try {
        const activePage = 1;
        const searchValue = 100;
        const response = await nestApiInstance.get(
            `${PATHS.SOFTWARE_SYSTEM}?page=${activePage}&size=${searchValue}`
        );
        if (response.status === 200) {
            return response.data.result;
        }
    } catch (error) {
        throw error;
    }
});

