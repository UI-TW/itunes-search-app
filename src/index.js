import 'babel-polyfill';
import App from './components/App';
import apiSettings from './urlConfig';
import {setVapidKey} from './utils/storageUtils';

new App().render();

// <!-- Step 3a: Fetch server identification (VAPID) key -->
// <!-- Step 3a: Fetch server identification (VAPID) key -->
