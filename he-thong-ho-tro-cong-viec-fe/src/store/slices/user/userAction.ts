import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import { PATHS } from "../../configPath";
import RestClient from "@/config/RestClient";

export const fetchAll_User = createAsyncThunk<any>(
  "user/fetchAll_User",
  async () => {
    try {
      const response = await RestClient.get(`${PATHS.USER}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);