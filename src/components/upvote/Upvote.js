import upvoteTemplate from './upvote.tpl.html';
import state from '../../state';
import apiSettings from '../../urlConfig';
import './Upvote.css';

class Upvote{
    constructor(){
      this.getUpvotes();
    }

    async getUpvotes(){
      try {
        state.status = 'loading';
        const resp = await fetch(apiSettings.upvote);
        const json = await resp.json();
        state.upvotes = {...json.favorites};
        this.render();
      } catch (e) {
        state.status = 'error';
      }      
    }

    render(){
      document.querySelector('#search_result').innerHTML = upvoteTemplate(state);
    }
}

export default Upvote;