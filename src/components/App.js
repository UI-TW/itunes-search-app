import '../helpers';
import Header from './header/Header';
import {getApiUrl} from '../utils';
import {getUserName} from '../utils/storageUtils';
import Search from './search/Search';

import Message from './Message/Message';
import './App.css';
import emitter from '../emitter';
import state from '../state';
import appTemplate from './app.tpl.html';
import Login from "./authentication/Login";
import Upvote from "./upvote/Upvote";
import List from "./list/List";

class App {
  constructor() {
    emitter.on('viewChange', this.render.bind(this));
    emitter.on('userVerification', this.setUserInfo.bind(this));
    emitter.on('search', this.getSearchResult.bind(this));
  }

  async getSearchResult(headerState) {
    try {
      state.status = 'loading';
      new Message().render();
      const resp = await fetch(getApiUrl(headerState));
      const json = await resp.json();
      state.data = {...json};
      state.status = json.resultCount ? 'init' : 'noContent';
      new List().render();
    } catch (e) {
      state.status = 'error';
    }
  }

  setUserInfo() {
    state.isLoggedIn = true;
    state.email = getUserName();
  }

  render() {
    let appContainer = document.querySelector('#itunes-search');
    appContainer.innerHTML = appTemplate();
    new Header();
    if (state.activeView === 'search') {
      new Search();
    } else if (state.activeView === 'login') {
      new Login().render();
    } else if (state.activeView === 'favorites') {
      new Upvote().render();
    }
  }
}

export default App;
