import Header from './Header';
import Container from './Container';
import '../style/App.css';
import containerTemplate from './container.tpl.html';

class App {
  constructor(){

  }
  render(){
    const appContainer = document.querySelector('#itunes-search');
    appContainer.innerHTML = containerTemplate();
    new Header();
    new Container();
  }
}

export default App;
