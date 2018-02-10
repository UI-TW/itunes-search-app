import './List.css';
import listTemplate from './list.tpl.html';
import state from '../../state';
import apiSettings from '../../urlConfig';
import { getAuthToken, getUserName } from '../../utils/storageUtils';


const attachEventListeners = () => {
  document.querySelector('#main').addEventListener('click', (e) => {
    if (e.target.classList.contains('active-icon')) {
      return false;
    } else if ([...e.target.classList].includes('like-icon')) {
      e.target.classList.add('active-icon');
      const collectionId = e.target.querySelector('input[type="hidden"]').value;
      const collection = state.data.results.find(item =>
        item.collectionId === parseInt(collectionId, 10));
        const requestItem = {
          method: 'POST',
          body: JSON.stringify(collection),
          headers: {
            'Content-Type': 'application/json',
            'authorization': getAuthToken()
          }
        };

        const postMessage = (reg) => {
          navigator.serviceWorker.controller.postMessage([{
            eventName: 'upvote',
            url: apiSettings.upvote,
            requestItem: requestItem
          }]);
          return reg.sync.register('upvoteSync');
        };
        
        //START: {Adding Sync} {2} out of {2}
        if ('serviceWorker' in navigator && 'SyncManager' in window) {
          navigator.serviceWorker.ready.then(function(reg) {
            if(navigator.serviceWorker.controller) {
              return postMessage(reg);
              
            }
            else {
              return new Promise((res, rej) => {
                navigator.serviceWorker.oncontrollerchange = function() {
                  res(postMessage(reg));
                };
              });              
            }
            
          }).catch(function() {
            fetch(apiSettings.upvote, requestItem);
          });
        }
        else {
          fetch(apiSettings.upvote, requestItem);
        }
        //END: {Adding Sync} {2} out of {2}
    }
  });
};

class List {
  render() {
    attachEventListeners();
    document.querySelector('#search_results').innerHTML = listTemplate({
      data: state.data.results,
      isLoggedIn: !!getUserName()
    });
  }
}

export default List;
