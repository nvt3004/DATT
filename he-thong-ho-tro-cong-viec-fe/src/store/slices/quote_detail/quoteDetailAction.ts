import { nestApiInstance } from "@/config/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { PATHS } from "../../configPath";
import RestClient from "@/config/RestClient";
interface NewDataQuote {
    id?: string;
    mocThoiGian: number;
    ngayHieuLuc: Date | string ;
    tieuDe: string;
    moTa: string;
    nguoiDung: number;
    baoHanh: number;
    goiSanPham: number;
    thoiGian: number;
}
export const fetchQuoteDetail = createAsyncThunk<
    any,
    { activePage: number; searchValue?: string }
>("quoteDetail/fetchquotedetail", async ({ activePage, searchValue }) => {
    try {
        const response = await RestClient.get(
            `${PATHS.QUOTE_DETAIL}?page=${activePage}&size=${searchValue}`
        );

        if (response.status === 200) {
            return response.data.result;
        }
    } catch (error) {
        throw error;
    }
});

