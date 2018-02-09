import './List.css';
import listTemplate from './list.tpl.html';
import state from '../../state';
import apiSettings from '../../urlConfig';
import { getAuthToken } from '../../utils/storageUtils';


const attachEventListeners = () => {
  document.querySelector('#main').addEventListener('click', (e) => {
    if (e.target.classList.contains('active-icon')) {
      return false;
    } else if ([...e.target.classList].includes('like-icon')) {
      e.target.classList.add('active-icon');
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
    const { isLoggedIn } = state;
    attachEventListeners();
    document.querySelector('#search_results').innerHTML = listTemplate({
      data: state.data.results,
      isLoggedIn
    });
  }
}

export default List;
