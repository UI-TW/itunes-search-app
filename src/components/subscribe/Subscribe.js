//START: {Adding Push} {3} out of {5}
import './Subscribe.css';
import subscribeTemplate from './subscribe.tpl.html';
import apiSettings from "../../urlConfig";
import {getVapidKey} from "../../utils/storageUtils";

class Notification {
  constructor() {
    this.render();
  }

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
    document.querySelector('#subscribeLink').addEventListener('click', this.subscribe.bind(this));
  }

  render() {
    this.attachEventListeners();
    document.querySelector('#container #subscribeLink').innerHTML = subscribeTemplate();
  }
}

//END: {Adding Push} {3} out of {5}

export default Notification;
