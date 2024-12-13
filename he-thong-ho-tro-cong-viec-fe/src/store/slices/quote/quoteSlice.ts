import { createSlice } from "@reduxjs/toolkit";

import { fetchDeatailQuote, fetchQuote, GetAll_NhomChucNang } from "./quoteAction";

const quoteSlice = createSlice({
  name: "quote",
  initialState: {
    items: [],
    loading: false,
    error: null,
    idPhanmem: null,
    idNhomChucNang: null,
    idChucNang: [],
    idPhangmuc: null,
    idBaogia: null,
    idSanpham: null,
    idBaoHanhBaoGia: null,
    idSanPhamBaoGia: null,
    idSanPhamMayChu: null,
    idKyThuatCongNghe: null,
  },
  reducers: {
    setIdPhanmem: (state, action) => {
      state.idPhanmem = action.payload;
    },
    setIdBaogia: (state, action) => {
      state.idBaogia = action.payload;
    },
    setIdSanpham: (state, action) => {
      state.idSanpham = action.payload;
    },
    setIdBaoHanhBaoGia: (state, action) => {
      state.idBaoHanhBaoGia = action.payload;
    },
    setIdNhomChucNang: (state, action) => {
      state.idNhomChucNang = action.payload;
    },
        setIdHangmuc: (state, action) => {
            state.idPhangmuc = action.payload;
        },
    setIdChucNang: (state, action) => {
      state.idChucNang = action.payload;
    },
    setIdSanPhamBaoGia: (state, action) => {
      state.idSanPhamBaoGia = action.payload;
    },
    setIdSanPhamMayChu: (state, action) => {
      state.idSanPhamMayChu = action.payload;
    },
    setIdKyThuatCongNghe: (state, action) => {
      state.idKyThuatCongNghe = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetch
      .addCase(fetchQuote.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchQuote.fulfilled, (state, action: any) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchQuote.rejected, (state: any, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      //Nhom chúc năng nè
      .addCase(GetAll_NhomChucNang.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetAll_NhomChucNang.fulfilled, (state, action: any) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(GetAll_NhomChucNang.rejected, (state: any, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      
      .addCase(fetchDeatailQuote.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDeatailQuote.fulfilled, (state, action: any) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchDeatailQuote.rejected, (state: any, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

  },
});
// Export reducer actions
export const { setIdPhanmem } = quoteSlice.actions;
export const { setIdBaogia } = quoteSlice.actions;
export const { setIdSanpham } = quoteSlice.actions;
export const { setIdNhomChucNang } = quoteSlice.actions;
export const { setIdChucNang } = quoteSlice.actions;
export const { setIdHangmuc } = quoteSlice.actions;
export const { setIdBaoHanhBaoGia } = quoteSlice.actions;
export const { setIdSanPhamBaoGia } = quoteSlice.actions;
export const { setIdSanPhamMayChu } = quoteSlice.actions;
export const { setIdKyThuatCongNghe } = quoteSlice.actions;

// Selectors
export const selectQuoteIdPhanmem = (state: any) => state.quote.idPhanmem;
export const selectQuoteIdBaogia = (state: any) => state.quote.idBaogia;
export const selectQuoteIdSanpham = (state: any) => state.quote.idSanpham;
export const selecIdSanphamBaoGia = (state: any) => state.quote.idSanPhamBaoGia;
export const selecIdSanphamMayChu= (state: any) => state.quote.idSanPhamMayChu;
export const selecidKyThuatCongNghe= (state: any) => state.quote.idKyThuatCongNghe;
export const selectQuoteIdNhomChucNang = (state: any) =>
  state.quote.idNhomChucNang;
export const selectQuoteIChucNang = (state: any) =>
  state.quote.idChucNang;
export const selectQuoteIdHangmuc= (state: any) => state.quote.idPhangmuc
export const selectQuoteIdBaoHanhBaoGia= (state: any) => state.quote.idBaoHanhBaoGia

// Selectors
export default quoteSlice.reducer;
