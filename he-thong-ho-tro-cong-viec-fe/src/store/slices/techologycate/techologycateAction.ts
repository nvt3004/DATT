import { createAsyncThunk } from "@reduxjs/toolkit";
import { PATHS } from "../../configPath";
import RestClient from "@/config/RestClient";



export const addTechnologycate = createAsyncThunk("Technologycate/addTechnologycate", async (newDaTechnologycate: any) => {
    try {
        const response = await RestClient.post(PATHS.TECHNOLOGYCATE, newDaTechnologycate);
        
        return response.data;
    } catch (error) {
        throw error;
    }
});