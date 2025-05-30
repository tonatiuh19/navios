//export const DOMAIN = "http://localhost:8015/api";
export const DOMAIN = "https://garbrix.com/navios/api/";

/*Store State*/
export interface AppState {
  userInfo: UserState;
  isLoading?: boolean;
  isError?: boolean;
}

export interface UserState {
  isSignedIn: boolean;
  isUserExist: boolean;
  isCodeSent: boolean;
  isIncorrectCode: boolean;
  isUserValidated: boolean;
  info: UserInfo;
}

export interface UserInfo {
  navios_user_id: number;
  navios_user_email: string;
  navios_user_full_name: string;
  navios_user_date_of_birth: string;
  navios_user_phone_number: string;
  navios_user_phone_number_code: string;
  navios_user_country_code: string;
  navios_user_stripe_id: string;
  navios_user_type: number;
  navios_user_created: string;
  navios_user_active: number;
}
