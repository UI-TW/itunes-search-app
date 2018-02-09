/* global $ */
import searchTemplate from './search.tpl.html';
import emitter from '../../emitter';
import './Search.css';
import state from '../../state';

const options = [
  'All',
  'Audiobook',
  'eBook',
  'Movie',
  'Music',
  'Music Video',
  'Podcast',
  'TV Show',
  'Software'
];

class Search {
  constructor() {
    state.media = state.media || 'All';
    state.query = state.query || '';
    state.options = options;
    this.ticking = false;
    this.render();
  }

  attachEventListeners() {
    $('.nav-wrapper .dropdown-button').dropdown({
      inDuration: 300,
      outDuration: 225
    });
    const searchInput = document.querySelector('.search-wrapper input');
    const searchOptionLink = document.querySelector('#search-options');
    searchInput.addEventListener('keyup', (e) => {
      if (!this.ticking) {
        this.rAf = window.requestAnimationFrame(this.update(e));
        this.ticking = true;
      }
    });

    searchOptionLink.addEventListener('click', (e) => {
      if (e.target.nodeName === 'A') {
        state.media = e.target.textContent.trim();
        if (state.query.length > 0) {
          this.emitSearch();
        }
        this.render();
      }
    });
  }

  emitSearch() {
    emitter.emit('search', state);
  }

  render() {
    const html = searchTemplate(state);
    document.querySelector('#container #main').innerHTML = html;
    document.querySelector('.search-wrapper input').value = state.query;
    this.attachEventListeners();
  }

  update = ({ keyCode, target: { value: query } }) => _ => {
    state.query = query;
    if (keyCode === 13) {
      this.emitSearch();
    }
    this.ticking = false;
  }
}

export default Search;
