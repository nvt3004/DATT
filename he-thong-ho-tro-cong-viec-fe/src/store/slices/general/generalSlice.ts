import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// types
type PrimaryColor = "blue" | "green";
export interface GeneralState {
  primaryColor: PrimaryColor;
}

// Khởi tạo giá trị mặc định
const initialState: GeneralState = {
  primaryColor: "blue",
};

export const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    setPrimaryColor: (state, action: PayloadAction<PrimaryColor>) => {
      state.primaryColor = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setPrimaryColor } = generalSlice.actions;

export default generalSlice.reducer;
