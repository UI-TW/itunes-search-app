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

export const urlB64ToUint8Array = (base64String) => {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
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
