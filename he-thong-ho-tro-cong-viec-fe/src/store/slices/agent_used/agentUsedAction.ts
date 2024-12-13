import { createAsyncThunk } from "@reduxjs/toolkit";
import { PATHS } from "../../configPath";
import RestClient from "@/config/RestClient";
interface NewDataAgent {
    id?: string;
    ten: string;
    moTa: string;
}
  
export const fetchAgent = createAsyncThunk<any, { activePage: number, searchValue?: string }>(
    "agent/fetchAgent",
    async ({ activePage, searchValue })  => {
        try {
            
            const response = await RestClient.get(`${PATHS.AGENT_USED}?page=${activePage}&size=${searchValue}`);
            
            if (response.status === 200) {
                return response.data
            }
        } catch (error) {
            throw error;
        }
    }
);

export const addAgent = createAsyncThunk("agent/addAgent", async (newDataAgent: NewDataAgent) => {
    try {
        const response = await RestClient.post(PATHS.AGENT_USED, newDataAgent);
        
        return response.data;
    } catch (error) {
        throw error;
    }
});

export const updateAgent = createAsyncThunk(
    "agent/updateAgent",
    async (newDataAgent: NewDataAgent) => {
        try {

            const response = await RestClient.put(`${PATHS.AGENT_USED}`, newDataAgent);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
);

export const deleteAgent = createAsyncThunk(
    "agent/deleteAgent",
    async (id: string | number) => {
        await RestClient.del(`${PATHS.AGENT_USED}?id=${id}`, {
            data: { id }
        });
        return id;
    }
);
