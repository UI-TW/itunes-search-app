import emitter from '../emitter';
import { getApiUrl } from '../utils';
import state from '../state';

import messageTemplate from './message.tpl.html';
import listTemplate from './list.tpl.html';
import Message from './Message';
import List from './List';


class Container {
  constructor(){
    emitter.on('search', this.getSearchResult.bind(this));
  }

  async getSearchResult(headerState) {
    try {
      state.status = 'loading';
      const resp = await fetch(getApiUrl(headerState));
      const json = await resp.json();
      state.data = { ...json };
      state.status = json.resultCount ? '' : 'noContent';
    } catch (e) {
      state.status = 'error';
    }
    this.render();
  }

  render(){
    let html;
    console.log(state);
    if(state.status.length){
      html = new Message().render();
    }
    else {
      html = new List().render();
    }

    document.querySelector('#search_result').innerHTML = html;
  }

}

export default Container;
