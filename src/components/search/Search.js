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
    this.state = {
      media: 'All',
      query: '',
      options: options
    };
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
      if(e.target.nodeName === 'A'){
        this.state.media = e.target.textContent.trim();
        if (this.state.query.length > 0) {
          this.emitSearch();
        }
        this.render();
      }      
    });
  }

  emitSearch() {
    emitter.emit('search', this.state);
  }

  render() {
    const html = searchTemplate(this.state);
    document.querySelector('#container #search').innerHTML = html;
    document.querySelector('.search-wrapper input').value =  this.state.query;
    this.attachEventListeners();
  }

  update = ({keyCode, target: {value: query}}) => _ => {
    this.state.query = query;
    if (keyCode === 13) {
      this.emitSearch();
    }
    this.ticking = false;
  }

}

export default Search;
