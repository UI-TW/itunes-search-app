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
    // <!-- Step 3a: Add subscribe icon to app -->
    new Subscribe();
    // <!-- Step 3a: Add subscribe icon to app -->
  }
}

export default App;
