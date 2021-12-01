import axios from "axios";
import { bookingApi, ApiResponse } from "lib/api";
import { IPartnerList, IPartnerDetail, IReview, IRecommendedList, IPartnerDetailForCompleted, IComment } from "types/partner";
import { API_MIDDLEWARE_URL } from "constants/env";

export const getPartnerList = async (page: number, size: number, idx?: string) => {
  const { data } = await bookingApi.request<ApiResponse<IPartnerList>>({
    method: "get",
    url: `/curation?page=${page}&size=${size}&idx=${idx}`
  });

  return data.data;
};

export const getPartnerDetail = async (adminId: string, idx: string) => {
  const { data } = await bookingApi.request<ApiResponse<IPartnerDetail>>({
    method: "get",
    url: `/partners/${adminId}?idx=${idx}`
  });

  return data.data;
};
export const getPartnerDetailForCompleted = async (adminId: string) => {
  const { data } = await bookingApi.request<ApiResponse<IPartnerDetailForCompleted>>({
    method: "get",
    url: `/partners/${adminId}`
  });

  return data.data;
};

export const getReviewList = async (adminId: string, page: number, size: number) => {
  const { data } = await bookingApi.request<ApiResponse<IReview[]>>({
    method: "get",
    url: `/reviews/${adminId}?page=${page}&size=${size}`
  });

  return data.data;
};

export const getRecommendedPartnerList = async (idx: string, admin_id: string[]) => {
  const { data } = await bookingApi.request<ApiResponse<IRecommendedList[]>>({
    method: "get",
    url: `/cart?idx=${idx}&admin_id=${admin_id}`
  });

  return data;
};

export const getMatchingIdx = async (idx: string, partners: string[]) => {
  const body = { idx: idx, partners: partners };
  return await axios.post(`${API_MIDDLEWARE_URL}/match`, body);
};

export const getCommentList = async (page: number, size: number) => {
  const { data } = await bookingApi.request<ApiResponse<IComment[]>>({
    method: "get",
    url: `/reviews?page=${page}&size=${size}`
  });

  return data.data;
};
