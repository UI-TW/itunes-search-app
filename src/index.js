import 'babel-polyfill';
import apiSettings from './urlConfig';
import App from './components/App';
import {setVapidKey} from './utils/storageUtils';

new App().render();
const getVapidKey = async () => {
    const resp = await fetch(apiSettings.getVapidKey);
    const json = await resp.json();
    setVapidKey(json.key);
};

getVapidKey();


