import { createAsyncThunk } from "@reduxjs/toolkit";
import { PATHS } from "../../configPath";
import RestClient from "@/config/RestClient";
interface NewDataAdvise {
  id?: string;
  ten: string;
  soDienThoai: string;
  email: string;
  danhXungId: string | number;
}

interface add_Cate {
  ten: string | any;
}

interface update_Cate {
  id: number | string;
  ten: string | any;
}

export const fetchCate = createAsyncThunk<
  any,
  { activePage: number; searchValue?: string }
>("cate/fetchCate", async ({ activePage, searchValue }) => {
  try {
    const response = await RestClient.get(
      `${PATHS.CATE}?page=${activePage}&size=${searchValue}`
    );

    if (response.status === 200) {
      return response.data.result;
    }
  } catch (error) {
    throw error;
  }
});

export const AddCate = createAsyncThunk(
  "cate/AddCate",
  async (data: add_Cate) => {
    try {
      const response = await RestClient.post(`${PATHS.CATE}`, data);

      if (response.status === 200) {
        return response.data.result;
      }
    } catch (error) {
      throw error;
    }
  }
);

export const DeleteCate = createAsyncThunk(
  "cate/AddCate",
  async (id: string | number) => {
    try {
      const response = await RestClient.del(`${PATHS.CATE}?id=${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const UpdateCate = createAsyncThunk(
  "cate/UpdateCate",
  async (data: update_Cate) => {
    try {
      const response = await RestClient.put(`${PATHS.CATE}`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);