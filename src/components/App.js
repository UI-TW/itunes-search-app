import '../helpers';
import Header from './header/Header';
import {getApiUrl} from '../utils';
import apiSettings from '../urlConfig';
import {getUserName, getVapidKey} from '../utils/storageUtils';
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

  //START: {Adding Push} {3} out of {5}
  subscribe(e) {
    e.preventDefault();
    const iconElement = e.currentTarget.querySelector('i');
    if (iconElement.textContent === 'notifications_active'){
      return;
    }
    navigator.serviceWorker.ready.then(function(reg) {
      const vapidKey = getVapidKey();
      console.log(vapidKey);
      reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: vapidKey
      })
        .then((subscription) => {
          iconElement.textContent = 'notifications_active';
          fetch(apiSettings.subscribe, {
            method: 'POST',
            body: JSON.stringify({
              subscription: subscription
            }),
            headers: new Headers({
              'Content-Type': 'application/json'
            })
          });
        })
        .catch((err) => {
          if (Notification.permission === 'denied') {
            console.warn('Permission for notifications was denied');
          } else {
            console.error('Failed to subscribe the user: ', err);
          }
        });
    });
  }

  attachEventListeners() {
    try {
      document.querySelector('#subscribeLink').removeEventListener('click', this.subscribe.bind(this));
    } catch (e) {
      throw e;
    }
    document.querySelector('#subscribeLink').addEventListener('click', this.subscribe.bind(this));
  }
  //END: {Adding Push} {3} out of {5}

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
    this.attachEventListeners();
  }
}

export default App;
