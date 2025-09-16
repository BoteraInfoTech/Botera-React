import Cookies from "js-cookie";
const TOKEN_KEY = "userToken";

export const isAuthenticated = () => {
  const tokens = Cookies.get(TOKEN_KEY);
  return tokens;
};

export const getToken = (isBearer) => {
  try {
    const tokens = Cookies.get(TOKEN_KEY);
    if (tokens) {
      if (isBearer) {
        return `Bearer ${tokens.toString()}`;
      }
      return tokens.toString();
    }
  } catch (e) {
    // ignore
  }
  return "";
};

export const setToken = (token) => {
  const expireInMin = 7;
  const date = new Date();
  date.setTime(date.getTime() + expireInMin * 60 * 1000);
  Cookies.set(TOKEN_KEY, token, {
    expires: date,
    secure: true,
    sameSite: "Strict",
  });
};
