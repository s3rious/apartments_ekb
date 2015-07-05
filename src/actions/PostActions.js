import { Actions } from 'flummox';
import asyncFetch from '../helpers/asyncFetch';

import foreman from '../foreman.js';

class PostActions extends Actions {

  async fetchNext (offset, getBy) {
    let url = `https://api.vk.com/method/wall.get?domain=apartments_ekb&offset=${offset}&count=${getBy}&filter=owner&v=5.34`;

    try {
      var data = await asyncFetch(url);
      await foreman.parsePosts(data.items);
      return data.count;
    }
    catch (error) {
      console.error('Something went wrong', error);
    }
  }

  createNewPost (post) {
    return post;
  }
}

export default PostActions;
