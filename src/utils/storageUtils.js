'use strict';
import toUint8Array from 'urlb64touint8array';

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

export const setVapidKeyToStore = (key) => {
  sessionStorage.setItem('vapidKey', JSON.stringify(key));
};

export const getVapidKeyFromStore = () => {
  const vapidKey = sessionStorage.getItem('vapidKey')
  if (vapidKey){
    const key = JSON.parse(vapidKey);
    const vapidKeyBuffer = toUint8Array(key);
    return vapidKeyBuffer;
  }
};
