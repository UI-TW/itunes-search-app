import 'babel-polyfill';
import App from './components/App';
import apiSettings from './urlConfig';
import {setVapidKeyToStore} from './utils/storageUtils';

new App().render();

// <!-- Step 4a: Fetch server identification (VAPID) key -->
const getVapidKey = async () => {
  const resp = await fetch(apiSettings.getVapidKey);
  const json = await resp.json();
  setVapidKeyToStore(json.key);
};

getVapidKey();
// <!-- Step 4a: Fetch server identification (VAPID) key -->
