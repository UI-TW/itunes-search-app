import urlB64ToUint8Array from 'urlb64touint8array';

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

export const setVapidKey= (key) => {
  sessionStorage.setItem('vapidKey', JSON.stringify(key));
};

export const getVapidKey = () => {
  if (sessionStorage.getItem('vapidKey')){
    const key = JSON.parse(sessionStorage.getItem('vapidKey'));
    const vapidKeyBuffer = urlB64ToUint8Array(key);
    return vapidKeyBuffer;
  }
};
