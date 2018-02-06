import './Header.css';
import headerTemplate from './header.tpl.html';
import state from '../../state';
import emitter from '../../emitter';
import { removeAuthToken, removeUserName } from '../../utils/storageUtils';


class Header {
  constructor() {
    this.render();
  }

  onClick(e) {
    const parentLink = e.target.closest('.menu__link');
    switch (parentLink.id) {
      case 'appHeader':
      case 'searchLink':
        e.preventDefault();
        state.status = 'init';
        state.activeView = 'search';
        emitter.emit('viewChange', state.activeView);
        break;
      case 'loginLink':
        e.preventDefault();
        state.status = 'init';
        state.activeView = 'login';
        emitter.emit('viewChange', state.activeView);
        break;
      case 'favLink':
        e.preventDefault();
        state.status = 'init';
        state.activeView = 'favorites';
        emitter.emit('viewChange', state.activeView);
        break;
      case 'logoutLink':
        e.preventDefault();
        removeAuthToken();
        removeUserName();
        state.status = 'init';
        state.isLoggedIn = false;
        state.isGuest = true;
        state.email = 'Guest';
        state.activeView = 'search';
        emitter.emit('viewChange', state.activeView);
        this.render();
        break;
      default:
    }
  }

  attachEventListeners() {
    try {
      document.querySelector('#header').removeEventListener('click', this.onClick.bind(this));
    } catch (e) {
      throw e;
    }
    document.querySelector('#header').addEventListener('click', this.onClick.bind(this));
  }

  render() {
    const html = headerTemplate(state);
    document.querySelector('#container #header').innerHTML = html;
    this.attachEventListeners();
  }
}

export default Header;
