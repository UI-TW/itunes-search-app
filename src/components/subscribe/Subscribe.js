import './Subscribe.css';
import subscribeTemplate from './subscribe.tpl.html';
import apiSettings from '../../urlConfig';
import {urlB64ToUint8Array} from '../../utils/storageUtils';

// <!-- Step 4a: serverKey -->
const appServerKey = '<Your server public key>';
// const appServerKey = 'BFXs5mFfxnPWaUY67CkLKC-Jc_hoSMQKTF-pNAlL3d2OF2ZiSCW8_fDin6f5F3gMbyHpD2kM_qXJ6k5arVudw-s';
// <!-- Step 4a: serverKey -->

class Subscribe {
  constructor() {
    this.render();
  }

  subscribe(e) {
    e.preventDefault();
    const iconElement = e.currentTarget.querySelector('i');
    if (iconElement.textContent === 'notifications_active'){
      return;
    }

    // <!-- Step 4b: Add subscribe action -->
    navigator.serviceWorker.ready.then(reg => {
      reg.pushManager.getSubscription().then((sub) => {
        if (sub == undefined) {
          // ask user to register for Push
          reg.pushManager
            .subscribe({
              userVisibleOnly: true,
              applicationServerKey: urlB64ToUint8Array(appServerKey)
            })
            .then(subscrption => {
              // Send subscrption to server.
              console.log(JSON.stringify(subscrption));
            })
            .catch(err => {
              // Handle permission denied
              if (Notification.permission === "denied") {
                console.warn("Permission for notifications was denied");
              } else {
                console.error("Failed to subscribe the user: ", err);
              }
            });
        } else {
          // You have subscription
          console.log('You already subscribed for push notification')
        }
      });
    });
    // <!-- Step 4b: Add subscribe action -->
  }


  attachEventListeners() {
    document.querySelector('#subscribeLink').addEventListener('click', this.subscribe.bind(this));
  }

  render() {
    this.attachEventListeners();
    document.querySelector('#container #subscribeLink').innerHTML = subscribeTemplate();
  }
}

export default Subscribe;
