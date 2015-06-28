import { Actions } from 'flummox';
import asyncFetch from '../helpers/asyncFetch';

import Post from '../models/Post';

class PostActions extends Actions {

  async fetchNext (offset, getBy) {
    let url = `https://api.vk.com/method/wall.get?domain=apartments_ekb&offset=${offset}&count=${getBy}&filter=owner&v=5.34`;

    try {
      var data = await asyncFetch(url);

      data.items.forEach((item) => {
        this.createNewPost(item);
      });

      return data.count;
    }
    catch (error) {
      console.error('Something went wrong', error);
    }
  }

  createNewPost (item) {
    return new Post(item);
  }
}

export default PostActions;
