import '../helpers';
import './App.css';
import appTemplate from './app.tpl.html';
import Router from './Router';

class App {
  render() {
    let appContainer = document.querySelector('#itunes-search');
    appContainer.innerHTML = appTemplate();
    new Router();
  }
}

export default App;
