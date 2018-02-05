import apiSettings from './urlConfig';

export const capitalize = (str) => (`${str[0].toUpperCase()}${str.slice(1).toLowerCase()}`);

export function getMedia(str) {
  if (str.indexOf(' ') === -1) {
    return str.toLowerCase();
  }
  const sg = str.split(' ');
  return `${sg[0].toLowerCase()}${capitalize(sg[1])}`;
}

export const setAuthToken = (token) => {
  sessionStorage.setItem('token', token);
};

export const getAuthToken = () => {
  return sessionStorage.getItem('token');
};

export const removeAuthToken = () => {
  sessionStorage.removeItem('token');
};

export const getApiUrl = ({
  media,
  query
}) => `${apiSettings.search}?media=${getMedia(media || 'all')}&term=${query.split(' ').join('+')}`;

export function getKind(str) {
  if (typeof str !== 'string') {
    return '';
  }

  if (str === 'tv') {
    return 'TV';
  } else if (str === 'feature') {
    return '';
  }

  if (str.indexOf('-') === -1) {
    return capitalize(str);
  }
  const sg = str.split('-');
  return `${getKind(sg[0])} ${capitalize(sg[1])}`.trim();
}
