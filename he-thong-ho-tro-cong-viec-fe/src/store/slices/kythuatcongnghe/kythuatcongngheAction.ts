// import { RestClient } from "@/config/api";
import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import { PATHS } from "../../configPath";
import RestClient from "@/config/RestClient";

interface Ikythuat_congnghe {
  noiDung: string | any;
  giaTri: string | any;
  baoGiaId: number | null;
  sanPhamId: number | null;
}

interface UpdateKythuat_congnghe {
  id: number | string;
  noiDung: string;
  giaTri: string;
  baoGiaId: string | number;
  sanPhamId: string | number;
}

export const Getall_Engineering_Technology = createAsyncThunk<
  string | number,
  { id: number; page: number; size: number }
>(
  "engineering_Technology/Getall_Engineering_Technology",
  async ({ id, page, size }) => {
    try {
      const response = await RestClient.get(
        `${PATHS.KYTHUATCONGNGHE}/baogiaid?baoGiaId=${id}&page=${page}&size=${size}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

// THEM KY THUAT CONG NGHE
export const addEngineering_Technology = createAsyncThunk(
  "engineering_Technology/addEngineering_Technology",
  async (data: Ikythuat_congnghe) => {
    try {
      const response = await RestClient.post(`${PATHS.KYTHUATCONGNGHE}`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const deleteEngineering_Technology = createAsyncThunk(
  "engineering_Technology/addEngineering_Technology",
  async (id: number | string) => {
    try {
      const response = await RestClient.del(
        `${PATHS.KYTHUATCONGNGHE}?id=${id}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

// CAP NHAT
export const upDateEngineering_Technology = createAsyncThunk(
  "engineering_Technology/upDateEngineering_Technology",
  async (data: UpdateKythuat_congnghe) => {
    try {
      const response = await RestClient.put(`${PATHS.KYTHUATCONGNGHE}`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
