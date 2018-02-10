import './Loader.css';
import state from '../../state';
import loaderTemplate from './loader.tpl.html';

const msgMap = {
  init: {
    icon: 'music_note',
    msg: null
  },
  loading: {
    msg: 'Loading...'
  },
  noContent: {
    icon: 'info',
    msg: 'No match'
  },
  error: {
    icon: 'error',
    msg: 'Error!'
  }
};


class Loader {
  render(id) {
    if (state.status !== 'init') {
      document.querySelector('#' + id).innerHTML = loaderTemplate({
        status: state.status,
        isLoading: state.status === 'loading',
        isCompleted: state.status !== 'loading',
        statusIcon: msgMap[state.status].icon,
        statusText: msgMap[state.status].msg
      });
    }
  }
}

export default Loader;
