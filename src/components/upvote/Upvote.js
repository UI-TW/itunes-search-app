import upvoteTemplate from './upvote.tpl.html';
import state from '../../state';
import apiSettings from '../../urlConfig';
import './Upvote.css';
import Message from "../Message/Message";

class Upvote {
  constructor() {
    this.getUpvotes();
  }

  sortFavs(a, b) {
    if (a.count > b.count) {
      return -1;
    }
    if (a.count < b.count) {
      return 1;
    }
    return 0;
  }

  async getUpvotes() {
    try {
      state.status = 'loading';
      const resp = await fetch(apiSettings.upvote);
      const json = await resp.json();
      state.status = json.favorites ? 'init' : 'noContent';
      state.upvotes = {...json.favorites.sort(this.sortFavs)};
      this.render();
    } catch (e) {
      state.status = 'error';
      this.render();
    }
  }

  render() {
    document.querySelector('#main').innerHTML = upvoteTemplate(state);
    new Message().render('main');
  }
}

export default Upvote;
