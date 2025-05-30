import { RootState } from "./index";

export const selectIsLoading = (state: RootState) => state.app.isLoading;
export const selectIsError = (state: RootState) => state.app.isError;

export const selectUserInfo = (state: RootState) => state.app.userInfo;

export const selectIsUserExist = (state: RootState) =>
  state.app.userInfo.isUserExist;

export const selectPorts = (state: RootState) => state.app.ports;
