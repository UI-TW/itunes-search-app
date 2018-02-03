import Header from './header/Header';
import Search from './search/Search';
import Container from './container/Container';
import './App.css';
import containerTemplate from './container/container.tpl.html';

class App {
  constructor(){

  }
  render(){
    const appContainer = document.querySelector('#itunes-search');
    appContainer.innerHTML = containerTemplate();
    new Header();
    new Search();
    new Container();
  }
}

export default App;
