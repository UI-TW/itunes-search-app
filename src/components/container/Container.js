import emitter from '../../emitter';
import state from '../../state';
import Message from '../Message/Message';
import List from '../list/List';
import Login from '../authentication/Login';
import Upvote from '../upvote/Upvote';
import apiSettings from '../../urlConfig';
import { getVapidKey } from '../../utils/storageUtils';
import './Container.css';

class Container {
  constructor() {
    this.render();
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
    if (state.activeView === 'login') {
      new Login().render();
    } else if (state.activeView === 'favorites') {
      new Upvote().render();
    } else if (state.status.length) {
      new Message().render();
    } else {
      new List().render();
    }
    this.attachEventListeners();
  }
}

export default Container;
