import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setLoading, setError } from "./appSlice";

/*const GET_PLATFORM_FIELDS_BY_ID = `${DOMAIN}/getPlatformFieldsById.php`;
const CREATE_PAYMENT_INTENT = `${DOMAIN}/createPaymentIntent.php`;

export const fetchPaymentIntentClientSecret = async (
  amount: number,
  customerId: string,
  id_platforms_date_time_slot: number
) => {
  try {
    const response = await axios.post(
      CREATE_PAYMENT_INTENT,
      {
        items: [{ id: id_platforms_date_time_slot, quantity: 1 }],
        amount: amount * 100,
        customer: customerId,
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    const { clientSecret } = response.data;
    return clientSecret;
  } catch (error) {
    console.error("Error fetching client secret:", error);
    throw error;
  }
};

export const fetchPlatformFields =
  (id_platform: number, id_platforms_user: number) =>
  async (
    dispatch: (arg0: {
      payload: PlatformField | undefined;
      type:
        | "app/fetchPlatformFieldsStart"
        | "app/fetchPlatformFieldsSuccess"
        | "app/fetchPlatformFieldsFailure";
    }) => void
  ) => {
    try {
      dispatch(fetchPlatformFieldsStart());
      const response = await axios.post<PlatformField>(
        GET_PLATFORM_FIELDS_BY_ID,
        {
          id_platform,
          imageDirectory: "../assets/images/carrouselImages",
          id_platforms_user,
        }
      );
      dispatch(fetchPlatformFieldsSuccess(response.data));
    } catch (error) {
      console.log("Error", error);
      dispatch(fetchPlatformFieldsFailure());
    }
  };*/
