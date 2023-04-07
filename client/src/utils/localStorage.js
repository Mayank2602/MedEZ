export const addTokenToLocalStorage = (token) => {
  localStorage.setItem("token", token);
};

export const removeTokenFromLocalStorage = () => {
  localStorage.removeItem("token");
};

export const getTokenFromLocalStorage = () => {
  const result = localStorage.getItem("token");
  const token = result ? result : null;
  return token;
};

export const addAccessTokenToLocalStorage = (token) => {
  localStorage.setItem("access_token", token);
};

export const removeAccessTokenFromLocalStorage = () => {
  localStorage.removeItem("access_token");
};

export const getAccessTokenFromLocalStorage = () => {
  const result = localStorage.getItem("access_token");
  const token = result ? result : null;
  return token;
};

