import Header from './header/Header';
import Search from './search/Search';
import Container from './container/Container';
import './App.css';
import emitter from '../emitter';
import state from '../state';
import containerTemplate from './container/container.tpl.html';

class App {
  constructor(){
    emitter.on('viewChange', this.render.bind(this));
  }
  render(){
    const appContainer = document.querySelector('#itunes-search');
    appContainer.innerHTML = containerTemplate();
    new Header();
    if(state.activeView === 'search'){
      new Search();
    }
    new Container();
  }
}

export default App;
