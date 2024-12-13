import { nestApiInstance } from "@/config/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { PATHS } from "../../configPath";
import RestClient from "@/config/RestClient";
interface NewDataQuote {
  id?: string;
  mocThoiGian: number;
  ngayHieuLuc: Date | string;
  tieuDe: string;
  moTa: string;
  nguoiDung: number;
  baoHanh: number;
  goiSanPham: number;
  thoiGian: number;
}
export const fetchQuote = createAsyncThunk<
  any,
  { activePage: number; searchValue?: string }
>("quote/fetchquote", async ({ activePage, searchValue }) => {
    try {
        const response = await RestClient.get(
            `${PATHS.QUOTE}?page=${activePage}&size=${searchValue}`
        );
    if (response.status === 200) {
      return response.data.result;
    }
  } catch (error) {
    throw error;
  }
});
export const addQuote = createAsyncThunk(
    "quote/addquote",
    async (newDataQuote: NewDataQuote) => {
        try {
            const response = await RestClient.post(`${PATHS.QUOTE}` , newDataQuote);
            if (response.status === 201) {
                return response.data;
            }
        } catch (error) {
            return error;
        }
  }
);

export const GetAll_NhomChucNang = createAsyncThunk("report/GetAll_NhomChucNang", async () => {
  try {
    const response = await nestApiInstance.get(
      `${PATHS.FUNCTION_GROUP}?page=1&size=100`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
});
export const fetchDeatailQuote = createAsyncThunk<
  any,
  { id: number | string } 
>("quotedetail/fetchquote", async ({ id }) => {
    try {
        const response = await RestClient.get(
            `${PATHS.QUOTE}/id?id=${id}`
        );
        if (response.status === 200) {
            return response.data.result;
        }
    } catch (error) {
        throw error;
    }
});
export const deleteQuote = createAsyncThunk(
    "quotedelete/quotedelete",
    async (id: string | number) => {
        const res = await RestClient.del(`${PATHS.QUOTE}?id=${id}`);
        return res;
    }
);
export const wordBangBaoGia = createAsyncThunk(
  "quotedelete/quotedelete",
  async (id: string | number) => {
      const res = await RestClient.get(`${PATHS.WORDBANGBAOGIA}?baoGiaId=${id}`);
      return res;
  }
);
