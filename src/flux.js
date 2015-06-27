import { Flummox } from 'flummox';

import PostActions from './actions/PostActions';
import PostStore from './stores/PostStore';

import ApartmentActions from './actions/ApartmentActions';
import ApartmentStore from './stores/ApartmentStore';

class Flux extends Flummox {

  constructor () {
    super();

    this.createActions('posts', PostActions);
    this.createStore('posts', PostStore, this);

    this.createActions('apartments', ApartmentActions);
    this.createStore('apartments', ApartmentStore, this);
  }
}

const flux = new Flux();
export default flux;
