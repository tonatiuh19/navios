//export const DOMAIN = "http://localhost:8015/api";
export const DOMAIN = "https://garbrix.com/navios/api/";

/*Store State*/
export interface AppState {
  userInfo: UserState;
  ports: PortsModel[];
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

export interface PortsModel {
  navios_port_id: number;
  navios_port_title: string;
  navios_port_price: string;
  navios_port_description: string;
  navios_port_type: number;
  navios_port_latitude: string;
  navios_port_longitude: string;
  navios_port_active: number;
  navios_port_type_title: string;
  average_rating: string;
  comments: CommentModel[];
}

export interface CommentModel {
  comment: string;
  created: string;
}
