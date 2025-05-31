import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  setLoading,
  setError,
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
} from "./appSlice";
import { DOMAIN } from "../app.model";

const INSERT_PLATFORM_USER = `${DOMAIN}/insertUser.php`;
const VALIDATE_USER_BY_EMAIL = `${DOMAIN}/validateUserByEmail.php`;
const SEND_CODE_BY_MAIL = `${DOMAIN}/sendCodeByMail.php`;
const VALIDATE_SESSION_CODE = `${DOMAIN}/validateSessionCode.php`;
const LOGOUT = `${DOMAIN}/logout.php`;
const GET_ACTIVE_PORTS = `${DOMAIN}/getActivePorts.php`;

export const insertUser =
  (
    navios_user_full_name: string,
    navios_user_date_of_birth: string,
    navios_user_email: string,
    navios_user_country_code: string,
    navios_user_type: number
  ) =>
  async (
    dispatch: (arg0: {
      payload: any;
      type:
        | "app/insertUserStart"
        | "app/insertUserSuccess"
        | "app/insertUserFailure";
    }) => void
  ) => {
    try {
      dispatch(insertUserStart());
      const response = await axios.post<any>(INSERT_PLATFORM_USER, {
        navios_user_full_name,
        navios_user_date_of_birth,
        navios_user_email,
        navios_user_country_code,
        navios_user_type,
      });
      dispatch(insertUserSuccess(response.data));
    } catch (error) {
      console.log("Error", error);
      dispatch(insertUserFailure());
    }
  };

export const validateUserByEmail =
  (email: string) =>
  async (
    dispatch: (arg0: {
      payload: any;
      type:
        | "app/validateUserByEmailStart"
        | "app/validateUserByEmailSuccess"
        | "app/validateUserByEmailFailure";
    }) => void
  ) => {
    try {
      dispatch(validateUserByEmailStart({ email }));
      const response = await axios.post<any>(VALIDATE_USER_BY_EMAIL, {
        email,
      });
      dispatch(validateUserByEmailSuccess(response.data));
    } catch (error) {
      console.log("Error", error);
      dispatch(validateUserByEmailFailure());
    }
  };

export const sendCodeByMail =
  (navios_user_id: number, email: string) =>
  async (
    dispatch: (arg0: {
      payload: any;
      type:
        | "app/sendCodeByMailStart"
        | "app/sendCodeByMailSuccess"
        | "app/sendCodeByMailFailure";
    }) => void
  ) => {
    try {
      dispatch(sendCodeByMailStart());
      const response = await axios.post<any>(SEND_CODE_BY_MAIL, {
        navios_user_id,
        email,
      });
      dispatch(sendCodeByMailSuccess(response.data));
    } catch (error) {
      console.log("Error", error);
      dispatch(sendCodeByMailFailure());
    }
  };

export const validateSessionCode =
  (navios_user_id: number, code: string) =>
  async (
    dispatch: (arg0: {
      payload: any;
      type:
        | "app/validateSessionCodeStart"
        | "app/validateSessionCodeSuccess"
        | "app/validateSessionCodeFailure";
    }) => void
  ) => {
    try {
      dispatch(validateSessionCodeStart());
      const response = await axios.post<any>(VALIDATE_SESSION_CODE, {
        navios_user_id,
        code,
      });
      dispatch(validateSessionCodeSuccess(response.data));
    } catch (error) {
      console.log("Error", error);
      dispatch(validateSessionCodeFailure());
    }
  };

export const logout =
  (navios_user_id: number) =>
  async (
    dispatch: (arg0: {
      payload: any;
      type: "app/logoutStart" | "app/logoutSuccess" | "app/logoutFailure";
    }) => void
  ) => {
    try {
      dispatch(logoutStart());
      const response = await axios.post<any>(LOGOUT, {
        navios_user_id,
      });
      dispatch(logoutSuccess(response.data));
    } catch (error) {
      console.log("Error", error);
      dispatch(logoutFailure());
    }
  };

export const getActivePorts =
  (
    location: {
      lat_min: number;
      lat_max: number;
      lng_min: number;
      lng_max: number;
    },
    navios_port_title?: string,
    navios_port_type?: number,
    average_rating?: number
  ) =>
  async (
    dispatch: (arg0: {
      payload: any;
      type:
        | "app/getActivePortsStart"
        | "app/getActivePortsSuccess"
        | "app/getActivePortsFailure";
    }) => void
  ) => {
    try {
      dispatch(getActivePortsStart());
      const body: any = { location };
      if (navios_port_title !== undefined)
        body.navios_port_title = navios_port_title;
      if (navios_port_type !== undefined)
        body.navios_port_type = navios_port_type;
      if (average_rating !== undefined) body.average_rating = average_rating;

      const response = await axios.post<any>(GET_ACTIVE_PORTS, body);
      dispatch(getActivePortsSuccess(response.data));
    } catch (error) {
      console.log("Error", error);
      dispatch(getActivePortsFailure());
    }
  };
