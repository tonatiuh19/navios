import { RootState } from "./index";

export const selectIsLoading = (state: RootState) => state.app.isLoading;
export const selectIsError = (state: RootState) => state.app.isError;
