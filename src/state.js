import {getUserName} from './utils/storageUtils';

const userName = getUserName();
export default {
  data: {},
  status: 'init',
  activeView: 'search',
  isLoggedIn: userName ? true : false,
  email: userName || 'Guest'
};

