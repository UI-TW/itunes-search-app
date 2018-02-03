import emitter from '../../emitter';
import {getApiUrl} from '../../utils';
import state from '../../state';
import Message from '../Message/Message';
import List from '../list/List';
import Login from '../authentication/Login';
import Upvote from '../upvote/Upvote';

class Container {
  constructor() {
    emitter.on('search', this.getSearchResult.bind(this));
    this.render();   
  }

  changeView(){
    this.render();
  }

  async getSearchResult(headerState) {
    try {
      state.status = 'loading';
      const resp = await fetch(getApiUrl(headerState));
      const json = await resp.json();
      state.data = {...json};
      state.status = json.resultCount ? '' : 'noContent';
    } catch (e) {
      state.status = 'error';
    }
    this.render();
  }

  render() {
    let html;
    if(state.activeView === 'login'){
      html = new Login().render();
    }
    else if(state.activeView === 'favorites'){
      html = new Upvote().render();
    }
    else {
      if (state.status.length) {
        html = new Message().render();
      }
      else {
        html = new List().render();
      }
    }
    

    document.querySelector('#search_result').innerHTML = html;
  }

}

export default Container;
