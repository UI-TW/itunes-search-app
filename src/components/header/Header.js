import './Header.css';
import headerTemplate from './header.tpl.html';
import state from '../../state';
import emitter from '../../emitter';
import {removeAuthToken, removeUserName, getUserName} from '../../utils/storageUtils';


class Header {
  constructor() {
    this.render();
  }

  onClick(e) {
    let parentLink;
    if (e.target.id === 'appHeader') {
      parentLink = e.target;
    } else {
      parentLink = e.target.closest('.menu__link')
    }
    switch (parentLink.id) {
      case 'appHeader':
      case 'searchLink':
        e.preventDefault();
        state.status = 'init';
        location.hash = '#search';
        break;
      case 'loginLink':
        e.preventDefault();
        state.status = 'init';
        location.hash = '#login';
        break;
      case 'favLink':
        e.preventDefault();
        state.status = 'init';
        location.hash = '#favorites';
        break;
      case 'logoutLink':
        e.preventDefault();
        removeAuthToken();
        removeUserName();
        location.reload();
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
    const userName = getUserName();
    const html = headerTemplate({
      isLoggedIn: !!userName,
      email: userName || 'Guest'
    });
    document.querySelector('#container #header').innerHTML = html;
    this.attachEventListeners();
  }
}

export default Header;
