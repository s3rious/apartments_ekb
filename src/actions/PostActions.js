import { Actions } from 'flummox';

import Post from '../models/Post';

class PostActions extends Actions {

  fetchNext () {
    return true;
  }

  createNewPost (item) {
    return new Post(item);
  }
}

export default PostActions;
