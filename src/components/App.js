import Header from './header/Header';
import {getApiUrl} from '../utils';
import Search from './search/Search';
import Container from './container/Container';
import './App.css';
import emitter from '../emitter';
import state from '../state';
import containerTemplate from './container/container.tpl.html';

class App {
  constructor(){
    emitter.on('viewChange', this.render.bind(this));
    emitter.on('search', this.getSearchResult.bind(this));
  }

  async getSearchResult(headerState) {
    try {
      state.status = 'loading';
      this.render();
      const resp = await fetch(getApiUrl(headerState));
      const json = await resp.json();
      state.data = {...json};
      state.status = json.resultCount ? '' : 'noContent';
    } catch (e) {
      state.status = 'error';
    }
    this.render();
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
