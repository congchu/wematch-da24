import { api, ApiResponse, bookingApi } from "lib/api";
import { RequestUserInfoInsert } from "../common/types";

export const submitForm = async (form: RequestUserInfoInsert) => {
  const { data } = await bookingApi.request<ApiResponse<RequestUserInfoInsert>>({
    method: "post",
    url: "/auto-match",
    data: form
  });

  return data.data;
};
