import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState, PortsModel, UserInfo } from "../app.model";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState: AppState = {
  userInfo: {
    isSignedIn: false,
    isUserExist: false,
    isCodeSent: false,
    isIncorrectCode: false,
    isUserValidated: false,
    info: {
      navios_user_id: 0,
      navios_user_email: "",
      navios_user_full_name: "",
      navios_user_date_of_birth: "",
      navios_user_phone_number: "",
      navios_user_phone_number_code: "",
      navios_user_country_code: "",
      navios_user_stripe_id: "",
      navios_user_type: 0,
      navios_user_created: "",
      navios_user_active: 0,
    } as UserInfo,
  },
  ports: [],
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
    insertUserStart(state) {
      state.isLoading = true;
      state.isError = false;
    },
    insertUserSuccess(state, action: PayloadAction<UserInfo>) {
      state.userInfo.info = action.payload;
      state.userInfo.isUserExist = true;
      state.isLoading = false;
    },
    insertUserFailure(state) {
      state.isLoading = false;
      state.isError = true;
    },
    validateUserByEmailStart(
      state,
      action: PayloadAction<{
        email: string;
      }>
    ) {
      state.userInfo.info.navios_user_email = action.payload.email;
      state.isLoading = true;
      state.isError = false;
    },
    validateUserByEmailSuccess(state, action: PayloadAction<UserInfo>) {
      if (!action.payload) {
        state.userInfo.isUserExist = action.payload;
      } else {
        state.userInfo.info = action.payload;
        state.userInfo.isUserExist = true;
      }

      state.isLoading = false;
    },
    validateUserByEmailFailure(state) {
      state.isLoading = false;
      state.isError = true;
    },
    sendCodeByMailStart(state) {
      state.isLoading = true;
      state.isError = false;
    },
    sendCodeByMailSuccess(state, action: PayloadAction<boolean>) {
      if (action.payload) {
        state.userInfo.isCodeSent = true;
      }
      state.isLoading = false;
    },
    sendCodeByMailFailure(state) {
      state.isLoading = false;
      state.isError = true;
    },
    validateSessionCodeStart(state) {
      state.isLoading = true;
      state.isError = false;
    },
    validateSessionCodeSuccess(state, action: PayloadAction<boolean>) {
      if (action.payload) {
        AsyncStorage.setItem(
          "navios_user_id",
          state.userInfo.info.navios_user_id.toString()
        );
      }
      state.userInfo.isSignedIn = action.payload;
      state.userInfo.isIncorrectCode = action.payload ? false : true;
      state.userInfo.isUserValidated = action.payload;
      state.isLoading = false;
    },
    validateSessionCodeFailure(state) {
      state.isLoading = false;
      state.isError = true;
    },
    logoutStart(state) {
      state.isLoading = true;
      state.isError = false;
    },
    logoutSuccess(state) {
      state.userInfo = initialState.userInfo;
      state.isLoading = false;
    },
    logoutFailure(state) {
      state.isLoading = false;
      state.isError = true;
    },
    getActivePortsStart(state) {
      state.isLoading = true;
      state.isError = false;
    },
    getActivePortsSuccess(state, action: PayloadAction<PortsModel[]>) {
      state.ports = action.payload;
      state.isLoading = false;
    },
    getActivePortsFailure(state) {
      state.isLoading = false;
      state.isError = true;
    },
  },
});

export const {
  setLoading,
  setError,
  clearState,
  insertUserStart,
  insertUserSuccess,
  insertUserFailure,
  validateUserByEmailStart,
  validateUserByEmailSuccess,
  validateUserByEmailFailure,
  sendCodeByMailStart,
  sendCodeByMailSuccess,
  sendCodeByMailFailure,
  validateSessionCodeStart,
  validateSessionCodeSuccess,
  validateSessionCodeFailure,
  logoutStart,
  logoutSuccess,
  logoutFailure,
  getActivePortsStart,
  getActivePortsSuccess,
  getActivePortsFailure,
} = appSlice.actions;

export default appSlice.reducer;
