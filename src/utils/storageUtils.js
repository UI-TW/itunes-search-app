export const setAuthToken = (token) => {
  sessionStorage.setItem('token', token);
};

export const getAuthToken = () => {
  return sessionStorage.getItem('token');
};

export const removeAuthToken = () => {
  sessionStorage.removeItem('token');
};

export const setUserName = (name) => {
  sessionStorage.setItem('name', name);
};

export const getUserName = () => {
  return sessionStorage.getItem('name');
};

export const removeUserName = () => {
  sessionStorage.removeItem('name');
};
