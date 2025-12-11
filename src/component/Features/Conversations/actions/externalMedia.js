import { BACKEND_POINT } from "../../../../utils/config";
import callApi from "../../../../utils/callApi";

export const getGifImages = (pageNum = 1, query = "", category = "") => {
  const url = `${BACKEND_POINT}/misc/getGif?currentPage=${pageNum}&q=${query}&category=${category}`;
  return {
    type: "GET_GIF",
    payload: callApi(url, "GET"),
    meta: { page: pageNum },
  };
};

export const unsplashImage = (pageNum = 1, query = "", category = "") => {
  const url = `${BACKEND_POINT}/misc/getUnsplashImage?currentPage=${pageNum}&q=${query}&category=${category}`;
  return {
    type: "GET_UNSPLASH_IMAGES",
    payload: callApi(url, "GET"),
    meta: { page: pageNum },
  };
};

export const pixabayImages = (pageNum = 1, query = "", category = "") => {
  const url = `${BACKEND_POINT}/misc/getPixabayImages?currentPage=${pageNum}&q=${query}&category=${category}`;
  return {
    type: "GET_PIXABAY_IMAGES",
    payload: callApi(url, "GET"),
    meta: { page: pageNum },
  };
};
