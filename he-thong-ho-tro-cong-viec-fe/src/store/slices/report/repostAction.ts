// import { RestClient } from "@/config/api";
import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import { PATHS } from "../../configPath";
import RestClient from "@/config/RestClient";

interface ReportData {
  ten: string;
  diadiem: string;
  giobatdau: string;
  gioketthuc: string;
  mota: string;
  nguoiDung: number;
}

interface Report_ingredient {
  ten: string | "";
  donvi: string | "";
  email: string;
  bienBanHopId: number | null;
  nguoiDungId: number | 0;
}
interface addReport_ingredient_outside {
  ten: string | "";
  donvi: string | "";
  email: string;
  bienBanHopId: number | null;
}


interface Report_conten {
  mota: string;
  bienBanThanhPhanId: number | null;
}

interface UpdateReport_conten {
  id: string | number;
  data: SetDataUpdate_conten
}

interface SetDataUpdate_conten {
  mota: string | "";
  bienBanThanhPhanId: number;
}

// interface UpdateReportIngredientPayload {
//   id: Iid;
//   data: SetUpdateData;
// }

interface Report_conclude {
  mota: string;
  bienBanHopId: number | null;
}

interface Iid {
  id: number | string;
}

interface SetUpdateData {
  donvi: string | "";
  email: string;
  ten: string | "";
  bienBanHopId: number;
  nguoiDungId: number | null;
}

interface SetUpdateData_conclude {
  mota: string | "";
  bienBanHopId: number;
}

interface UpdateReportIngredientPayload {
  id: Iid;
  data: SetUpdateData;
}

interface UpdateReport_conclude {
  id: string | number;
  data: SetUpdateData_conclude;
}


export const fetchData_Report = createAsyncThunk<
  string | number,
  { page: number; size: number }
>("report/fetchData_Report", async ({ page, size }) => {
  try {
    const response = await RestClient.get(
      `${PATHS.GetALL_Report}?page=${page}&size=${size}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const addReport = createAsyncThunk(
  "report/addReport",
  async (data: ReportData) => {
    try {
      const response = await RestClient.post(`${PATHS.GetALL_Report}`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const updateReport = createAsyncThunk(
  "posts/updateReport",
  async (updateReport: any) => {
    try {
      const { id, data }: any = updateReport;
      const response = await RestClient.put(
        `${PATHS.GetALL_Report}?id=${id}`,
        data
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const deleteReport = createAsyncThunk(
  "report/deleteReport",
  async (reportID: string | number) => {
    await RestClient.del(`${PATHS.GetALL_Report}?id=${reportID}`);
    return reportID;
  }
);

export const GetoneReport = createAsyncThunk<number, { id: number }>(
  "report/GetoneReport",
  async ({ id }) => {
    try {
      const response = await RestClient.get(
        `${PATHS.GetALL_Report}/search?id=${id}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

// THEM THANH PHAN BIEN BANG
export const addReport_ingredient = createAsyncThunk(
  "report/addReport_ingredient",
  async (data: Report_ingredient) => {
    try {
      const response = await RestClient.post(
        `${PATHS.Report_ingredient}`,
        data
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

// THEM THANH PHAN BIEN BANG
export const addReport_ingredient_outside = createAsyncThunk(
  "report/addReport_ingredient",
  async (data: addReport_ingredient_outside) => {
    try {
      const response = await RestClient.post(
        `${PATHS.Report_ingredient}`,
        data
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

// XOA THANH PHAN BIEN BANG
export const deleteReport_ingredient = createAsyncThunk(
  "report/deleteReport_ingredient",
  async (id: number | string) => {
    try {
      const response = await RestClient.del(
        `${PATHS.Report_ingredient}?id=${id}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

// CAP NHAT BIEN BAN THANH PHAN
export const upDateReport_ingredient = createAsyncThunk(
  "report/upDateReport_ingredient",
  async ({ id, data }: UpdateReportIngredientPayload) => {
    try {
      const response = await RestClient.put(
        `${PATHS.Report_ingredient}?id=${id}`,
        data
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

// THEM NOI DUNG PHAT BIEU
export const addReport_conten = createAsyncThunk(
  "report/addReport_conten",
  async (data: Report_conten) => {
    try {
      const response = await RestClient.post(`${PATHS.Report_Conten}`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
// CAP NHAT NOI DUNG PHAT BIEU
export const updateReport_conten = createAsyncThunk(
  "report/updateReport_conclude",
  async ({ id, data }: UpdateReport_conten) => {
    try {
      const response = await RestClient.put(
        `${PATHS.Report_Conten}?id=${id}`,
        data
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

// XOA NOI DUNG PHAT BIEU
export const deleteReport_conten = createAsyncThunk(
  "report/deleteReport_conten",
  async (id: string | number) => {
    await RestClient.del(`${PATHS.Report_Conten}?id=${id}`);
    return id;
  }
);

// THEM KET LUAN BIEN BAN
export const addReport_conclude = createAsyncThunk(
  "report/addReport_conclude",
  async (data: Report_conclude) => {
    try {
      const response = await RestClient.post(`${PATHS.Report_Conclude}`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

// XOA KET LUAN BIEN BAN
export const deleteReport_conclude = createAsyncThunk(
  "report/addReport_conclude",
  async (id: string | number) => {
    await RestClient.del(`${PATHS.Report_Conclude}?id=${id}`);
    return id;
  }
);

// CAP NHAT KET LUAN BIEN BAN
export const updateReport_conclude = createAsyncThunk(
  "report/updateReport_conclude",
  async ({ id, data }: UpdateReport_conclude) => {
    try {
      const response = await RestClient.put(
        `${PATHS.Report_Conclude}?id=${id}`,
        data
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
