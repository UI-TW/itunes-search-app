import '../style/Header.css';
import headerTemplate from './header.tpl.html';
import emitter from '../emitter';

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

class Header {
  constructor(){
    this.state = {
      media: 'All',
      query: '',
      options: options
    };
    this.ticking = false;
    this.render();
    this.attachEventListeners();
    
  }

  attachEventListeners(){
    const searchInput = document.querySelector('.header-search-wrapper input');
    const searchOptionLink = document.querySelector('#search-options li a');
    searchInput.addEventListener('keyup', (e) => {
      if (!this.ticking) {
        this.rAf = window.requestAnimationFrame(this.update(e));
        this.ticking = true;
      }
    });

    searchOptionLink.addEventListener('click', (e) => {
      this.media = e.target.textContent;
      if(this.state.query.length > 0){
        this.emitSearch();
      }
    });
    
  }

  emitSearch() {
    emitter.emit('search', this.state);
  }

  render(){
    const html = headerTemplate(this.state);
    document.querySelector('#container #header').innerHTML = html;
  }

  update = ({ keyCode, target: { value: query } }) => _ => {
    this.state.query = query;
    if(keyCode === 13) {
      this.emitSearch();
    }
    this.ticking = false;
  }

}

export default Header;
