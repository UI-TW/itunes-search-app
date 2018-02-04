import upvoteTemplate from './upvote.tpl.html';
import './Upvote.css';

class Upvote{
    constructor(){

    }

    render(){
      document.querySelector('#search_result').innerHTML = upvoteTemplate();
    }
}

export default Upvote;