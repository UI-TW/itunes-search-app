import './Message.css';
import state from '../../state';
import messageTemplate from './message.tpl.html';

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


class Message {
  render(id) {
    document.querySelector('#' + id).innerHTML = messageTemplate({
      status: state.status,
      isLoading: state.status === 'loading',
      isCompleted: state.status !== 'loading',
      statusIcon: msgMap[state.status].icon,
      statusText: msgMap[state.status].msg
    });

  }
}

export default Message;
