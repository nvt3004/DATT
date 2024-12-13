// import { RestClient } from "@/config/api";
import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import { PATHS } from "../../configPath";
import RestClient from "@/config/RestClient";



interface Report_conclude {
    baoGiaId: number | null,
    sanPhamId: number | null,
    hangMucId: number | null,
    nhomChucNangId: number | null,
    chucNangId: any | null
}


// THEM KET CHUC NANG HANG MUC
export const addFunction_category = createAsyncThunk(
  "function_category/addFunction_category",
  async (data: Report_conclude) => {
    try {
      const response = await RestClient.post(
        `${PATHS.FUNCTION_CATEGORY}`,
        data
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);



