import 'babel-polyfill';
import App from './components/App';
import apiSettings from './urlConfig';
import {setVapidKey} from './utils/storageUtils';

new App().render();

// <!-- Step 4a: Fetch server identification (VAPID) key -->
// <!-- Step 4a: Fetch server identification (VAPID) key -->
