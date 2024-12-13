import { nestApiInstance } from "@/config/api";
import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import { PATHS } from "../../configPath";

interface ReportData {
  ten: string;
  mota: string;
}

export const fetchData_Content_new = createAsyncThunk<
  string | number,
  { page: number; size: number }
>("report/fetchData_Content_new", async ({ page, size }) => {
  try {
    const response = await nestApiInstance.get(
      `${PATHS.CONTEN}?page=${page}&size=${size}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const addContent_new = createAsyncThunk(
  "report/addContent_new",
  async (data: ReportData) => {
    try {
      const response = await nestApiInstance.post(`${PATHS.CONTEN}`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const updateContent_new = createAsyncThunk(
  "posts/updateContent_new",
  async (updateContent_new: any) => {
    try {
      const { id, data }: any = updateContent_new;
      const response = await nestApiInstance.put(
        `${PATHS.CONTEN}?id=${id}`,
        data
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const deletContent_new = createAsyncThunk(
  "report/deleteReport",
  async (reportID: string | number) => {
    await nestApiInstance.delete(`${PATHS.GetALL_Report}?id=${reportID}`);
    return reportID;
  }
);
