import React from 'react/addons';
import { Store } from 'flummox';

class PostStore extends Store {

  constructor (flux) {
    super();

    const postActions = flux.getActions('posts');

    this.register(postActions.fetchNext, this.handleFetchNext);
    this.register(postActions.createNewPost, this.handleCreateNewPost);

    this.state = {
      count: 0,
      posts: {}
    };
  }

  getNextUrl = function () {
    return `https://api.vk.com/method/wall.get?domain=apartments_ekb&offset=${this.offset}&count=${this.getBy}&filter=owner&v=5.34`;
  };

  handleFetchNext (count) {

    this.setState({
      count: count
    });
  }

  handleCreateNewPost (post) {

    this.setState({
      posts: React.addons.update(
        this.state.posts,
        { $merge: { [post.id]: post } }
      )
    });
  }
}

export default PostStore;
