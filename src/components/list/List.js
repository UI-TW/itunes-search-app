import './List.css';
import listTemplate from './list.tpl.html';
import state from '../../state';
import {getAuthToken} from '../../utils';

class List {
  constructor() {

  }

  attachEventListeners() {
    const likeIcon = document.querySelectorAll('.like-icon');
    if (likeIcon.length) {
      Array.from(likeIcon).forEach(icon => {
        icon.addEventListener('click', (e) => {
          e.target.classList.toggle('active-icon');
          const collectionId = e.target.querySelector('input[type="hidden"]').value;
          const collection = state.data.results.find(item => item.collectionId == parseInt(collectionId, 10));
            const resp = fetch('https://dry-temple-99897.herokuapp.com/api/upvote', {
              method: 'POST',
              body: JSON.stringify(collection),
              headers: new Headers({
                'Content-Type': 'application/json',
                'authorization': getAuthToken()
              })
            })
            .then(res => res.json())
            .then(res => {
              console.log('added successfully');
            })
        });
      });
    }
  }

  render() {
    const results = state.data.results;
    const isLoggedIn = state.isLoggedIn;
    document.querySelector('#search_result').innerHTML = listTemplate({
      data: results,
      isLoggedIn
    });
    this.attachEventListeners();
  }
}

export default List;
