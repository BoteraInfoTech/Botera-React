import axios from "axios";
import { getToken } from "./auth";

const callAPI = async (
  apiURL,
  method = "GET",
  apiData = {},
  responseType = "json"
) => {
  try {
    const headers = {
      "Content-Type": "application/json",
    };
    const token = getToken(true);
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const requestSource = axios.CancelToken.source();

    return new Promise((resolve, reject) =>
      axios({
        url: apiURL,
        method,
        data: apiData,
        cancelToken: requestSource.token,
        headers,
        responseType,
      })
        .then((res) => resolve(res.data))
        .catch((err) => reject(err))
    );
  } catch (error) {
    throw error;
  }
};

export default callAPI;
