import { Actions, Store, Flummox } from 'flummox';
import asyncFetch from '../helpers/asyncFetch.js';

class PostStore extends Store {

  constructor(flux) {
    super();

    const postActions = flux.getActions('posts');

    this.offset = 1;
    this.getBy = 10;

    this.register(postActions.fetchNext, this.handleFetchNext);

    this.state = {};
  }

  getNextUrl = function () {
    return `https://api.vk.com/method/wall.get?domain=apartments_ekb&offset=${this.offset}&count=${this.getBy}&filter=owner&v=5.34`;
  };

  async handleFetchNext () {
    var data = await asyncFetch(this.getNextUrl());

    this.length = data.count;
    this.offset = this.offset + data.items.length;

    data.items.forEach(item => {
      let post = new Post(item);
      this.setState({
        [post.id]: post;
      });
    });
  }
}
