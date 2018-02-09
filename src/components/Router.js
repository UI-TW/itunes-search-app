import Search from "./search/Search";
import Login from "./authentication/Login";
import Upvote from "./upvote/Upvote";
import Header from './header/Header';

class Router {
  constructor() {
    window.onhashchange = this.hashChanged.bind(this);
    this.hashChanged();
  }

  hashChanged() {
    new Header();
    const hash = window.location.hash.replace('#','');
    switch(hash) {
      case 'login':
        new Login().render();
        break;
      case 'favorites':
        new Upvote().render();
        break;
      case 'search':
      default:
        new Search();
        break;
    }
  }
}

export default Router;
