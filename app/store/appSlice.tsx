import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "../app.model";

const initialState: AppState = {
  isLoading: false,
  isError: false,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setError(state, action: PayloadAction<boolean>) {
      state.isError = action.payload;
    },
    clearState(state) {
      state.isLoading = false;
      state.isError = false;
    },
  },
});

export const { setLoading, setError, clearState } = appSlice.actions;

export default appSlice.reducer;
