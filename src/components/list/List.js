import './List.css';
import listTemplate from './list.tpl.html';
import state from '../../state';

class List {
  constructor(){

  }

  render(){
    return listTemplate({
      data: state.data.results
    });


  }
}

export default List;
