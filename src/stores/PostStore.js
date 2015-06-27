import { Store } from 'flummox';

import asyncFetch from '../helpers/asyncFetch';

class PostStore extends Store {

  constructor (flux) {
    super();

    const postActions = flux.getActions('posts');

    this.offset = 1;
    this.getBy = 10;

    this.register(postActions.fetchNext, this.handleFetchNext);
    this.register(postActions.createNewPost, this.handleCreateNewPost);

    this.state = {};
  }

  getNextUrl = function () {
    return `https://api.vk.com/method/wall.get?domain=apartments_ekb&offset=${this.offset}&count=${this.getBy}&filter=owner&v=5.34`;
  };

  async handleFetchNext () {
    var data = await asyncFetch(this.getNextUrl());

    this.length = data.count;
    this.offset = this.offset + data.items.length;

    let flux = flux;
    data.items.forEach((item) => {
      flux.getActions('posts').createNewPost(item);
    });
  }

  handleCreateNewPost (post) {
    this.setState({
      [post.id]: post
    });
  }
}

export default PostStore;
