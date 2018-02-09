import '../helpers';

import {getApiUrl} from '../utils';
import apiSettings from '../urlConfig';
import {getVapidKey} from '../utils/storageUtils';

import Message from './Message/Message';
import './App.css';
import emitter from '../emitter';
import state from '../state';
import appTemplate from './app.tpl.html';
import List from "./list/List";
import Router from './Router';

class App {
  constructor() {
    emitter.on('search', this.getSearchResult.bind(this));
  }

  async getSearchResult(headerState) {
    try {
      state.status = 'loading';
      new Message().render('search_results');
      const resp = await fetch(getApiUrl(headerState));
      const json = await resp.json();
      state.data = {...json};
      state.status = json.resultCount ? 'init' : 'noContent';
      new List().render();
    } catch (e) {
      state.status = 'error';
    }
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
          })
          .then((resp) => {
            if(resp.ok)
              console.log('%c Push notification subscription successful', 'color: #00ffff');
          })
          .catch((err) => {
            console.log('Error on subcription', err);
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
    new Router();
    this.attachEventListeners();
  }
}

export default App;
