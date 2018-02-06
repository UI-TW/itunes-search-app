import 'babel-polyfill';
import App from './components/App';

new App().render();

// TODO change it to a better style
document.querySelector('#initial-content').className += ' hide';