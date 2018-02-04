import './Header.css';
import headerTemplate from './header.tpl.html';
import state from '../../state';
import emitter from '../../emitter';
import {removeAuthToken} from '../../utils';

class Header {
  constructor() {
    this.render();
  }

  attachEventListeners(){
    document.querySelector('#header').addEventListener('click', (e) => {
      switch(e.target.id){
        case 'appHeader': 
          e.preventDefault();
          state.activeView = 'search';
          emitter.emit('viewChange', state.activeView);
        break;
        case 'loginLink':
          e.preventDefault();
          state.activeView = 'login';
          emitter.emit('viewChange', state.activeView);
        break;
        case 'favLink':
          e.preventDefault();
          state.activeView = 'favorites';
          emitter.emit('viewChange', state.activeView);
        break;
        case 'logoutLink':
          e.preventDefault();
          removeAuthToken();
          state.activeView = 'search';
          emitter.emit('viewChange', state.activeView);
      }
    });
  }

  render() {    
    const html = headerTemplate(state);
    document.querySelector('#container #header').innerHTML = html;
    this.attachEventListeners();
  }
}

export default Header;
