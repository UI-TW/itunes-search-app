import emitter from '../../emitter';
import state from '../../state';
import Message from '../Message/Message';
import List from '../list/List';
import Login from '../authentication/Login';
import Upvote from '../upvote/Upvote';

class Container {
  constructor() {
    this.render();
  }

  render() {
    if (state.activeView === 'login') {
      new Login().render();
    } else if (state.activeView === 'favorites') {
      new Upvote().render();
    } else if (state.status.length) {
      new Message().render();
    } else {
      new List().render();
    }
  }
}

export default Container;
