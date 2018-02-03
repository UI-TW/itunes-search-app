import './Header.css';
import headerTemplate from './header.tpl.html';
import state from '../../state';
import emitter from '../../emitter';

class Header {
  constructor() {
    this.render();
  }

  attachEventListeners(){
    document.querySelector('#appHeader').addEventListener('click', (e) => {
      e.preventDefault();
      state.activeView = 'search';
      emitter.emit('viewChange', state.activeView);
    });

    document.querySelector('#loginLink').addEventListener('click', (e) => {
      e.preventDefault();
      state.activeView = 'login';
      emitter.emit('viewChange', state.activeView);
    });

    document.querySelector('#favLink').addEventListener('click', (e) => {
      e.preventDefault();
      state.activeView = 'favorites';
      emitter.emit('viewChange', state.activeView);
    });
  }

  render() {
    const html = headerTemplate(this.state);
    document.querySelector('#container #header').innerHTML = html;
    this.attachEventListeners();
  }
}

export default Header;
