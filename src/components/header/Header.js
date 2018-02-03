import './Header.css';
import headerTemplate from './header.tpl.html';

class Header {
  constructor() {
    this.render();
  }

  render() {
    const html = headerTemplate(this.state);
    document.querySelector('#container #header').innerHTML = html;
  }
}

export default Header;
