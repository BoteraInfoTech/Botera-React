import Cookies from "js-cookie";

const TOKEN_KEY = "userToken";

export const isAuthenticated = () => {
  let tokens = Cookies.get(TOKEN_KEY);
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
  Cookies.set(TOKEN_KEY, token, {
    secure: true,
    sameSite: "Strict",
  });
};

export const logout = () => {
  Cookies.remove(TOKEN_KEY, { path: "/" });
  sessionStorage.clear();
  localStorage.clear();
};
