import 'babel-polyfill';
import App from './components/App';
import apiSettings from './urlConfig';
import {setVapidKey} from './utils/storageUtils';

new App().render();

// <!-- Step 3a: Fetch server identification (VAPID) key -->
const getVapidKey = async () => {
  const resp = await fetch(apiSettings.getVapidKey);
  const json = await resp.json();
  setVapidKey(json.key);
};

getVapidKey();
// <!-- Step 3a: Fetch server identification (VAPID) key -->
