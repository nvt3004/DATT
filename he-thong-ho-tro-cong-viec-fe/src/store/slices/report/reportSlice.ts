import { createSlice } from "@reduxjs/toolkit";
import {
  fetchData_Report,
  addReport,
  GetoneReport,
  addReport_ingredient,
  addReport_conten,
} from "../report/repostAction";

const reportSlice = createSlice({
  name: "report",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      // GETALL bienbanhop
      .addCase(fetchData_Report.pending, (state: any) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchData_Report.fulfilled, (state: any, action: any) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchData_Report.rejected, (state: any, action: any) => {
        state.loading = false;
        state.error = action.error.message;
      })

      //   thêm biên bản hợp
      .addCase(addReport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addReport.fulfilled, (state: any, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(addReport.rejected, (state: any, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // GETONE
      .addCase(GetoneReport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetoneReport.fulfilled, (state: any, action: any) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(GetoneReport.rejected, (state: any, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // them bien ban thanh phan
      .addCase(addReport_ingredient.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addReport_ingredient.fulfilled, (state: any, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(addReport_ingredient.rejected, (state: any, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // them noi dung phat bieu
      .addCase(addReport_conten.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addReport_conten.fulfilled, (state: any, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(addReport_conten.rejected, (state: any, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default reportSlice.reducer;
