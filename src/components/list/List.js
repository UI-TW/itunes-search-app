import './List.css';
import listTemplate from './list.tpl.html';
import state from '../../state';

class List {
  constructor() {

  }

  attachEventListeners() {
    const likeIcon = document.querySelectorAll('.like-icon');
    if (likeIcon.length) {
      Array.from(likeIcon).forEach(icon => {
        icon.addEventListener('click', (e) => {
          e.target.classList.toggle('active-icon');
        });
      });
    }
  }

  render() {
    const results = state.data.results;
    document.querySelector('#search_result').innerHTML = listTemplate({
      data: results
    });
    this.attachEventListeners();
  }
}

export default List;
