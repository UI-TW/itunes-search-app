import {getUserName} from './utils/storageUtils';

const userName = getUserName();
export default {
  data: {},
  status: 'init',
  isLoggedIn: !!userName,
  email: userName || 'Guest'
};

