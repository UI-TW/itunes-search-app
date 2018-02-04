import upvoteTemplate from './upvote.tpl.html';
import './Upvote.css';

class Upvote{
    constructor(){

    }

    render(){
        return upvoteTemplate();
    }
}

export default Upvote;