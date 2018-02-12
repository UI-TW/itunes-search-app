import '../helpers';
import './App.css';
import appTemplate from './app.tpl.html';
import Router from './Router';
import Subscribe from './subscribe/Subscribe';

class App {
  render() {
    let appContainer = document.querySelector('#itunes-search');
    appContainer.innerHTML = appTemplate();
    new Router();
    new Subscribe();
  }
}

export default App;
