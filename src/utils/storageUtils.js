// START: {Adding Push} {5} out of {5}
function urlB64ToUint8Array(base64String) {
  var padding = '='.repeat((4 - base64String.length % 4) % 4);
  var base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  var rawData = window.atob(base64);
  var outputArray = new Uint8Array(rawData.length);

  for (var i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
// END: {Adding Push} {5} out of {5}
export const setAuthToken = (token) => {
  sessionStorage.setItem('token', token);
};
// START: {Adding Push} {5} out of {5}
export const setVapidKey = (key) => {
  sessionStorage.setItem('vapidKey', JSON.stringify(key));
};

export const getVapidKey = () => {
  if (sessionStorage.getItem('vapidKey')){
    const key = JSON.parse(sessionStorage.getItem('vapidKey'));
    const vapidKeyBuffer = urlB64ToUint8Array(key);
    console.log(vapidKeyBuffer);
    return vapidKeyBuffer;
  }
};
// END: {Adding Push} {5} out of {5}
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
