import './List.css';
import listTemplate from './list.tpl.html';
import state from '../../state';
import apiSettings from '../../urlConfig';
import { getAuthToken } from '../../utils';

const attachEventListeners = () => {
  document.querySelector('#search_result').addEventListener('click', (e) => {
    if ([...e.target.classList].includes('like-icon')) {
      e.target.classList.toggle('active-icon');
      const collectionId = e.target.querySelector('input[type="hidden"]').value;
      const collection = state.data.results.find(item =>
        item.collectionId === parseInt(collectionId, 10));
      fetch(apiSettings.upvote, {
        method: 'POST',
        body: JSON.stringify(collection),
        headers: new Headers({
          'Content-Type': 'application/json',
          authorization: getAuthToken()
        })
      })
        .then(res => res.json());
    }
  });
};

class List {
  render() {
    const isLoggedIn = { state };
    attachEventListeners();
    document.querySelector('#search_result').innerHTML = listTemplate({
      data: state.data.results,
      isLoggedIn
    });
  }
}

export default List;
