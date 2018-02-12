import './Subscribe.css';
import subscribeTemplate from './subscribe.tpl.html';
import apiSettings from '../../urlConfig';
import {getVapidKey} from '../../utils/storageUtils';

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
