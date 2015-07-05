import lscache from 'lscache';
import _ from 'lodash';

import Parser from 'worker!./parser.js';
import flux from './flux.js';

class Foreman {

  constructor () {
    lscache.flushExpired();
  }

  parsePosts (posts) {

    return new Promise((resolve, reject) => {
      let promises = [];

      posts.forEach((post) => {
        promises.push(this.parsePost(post));
      });

      Promise
        .all(promises)
        .then(() => {
          resolve();
        });
    });
  }

  parsePost (rawData) {
    let promise = new Promise((resolve, reject) => {
      let completePost = this.getPostFromCache(rawData.id);

      if (completePost) {
        this.insertCachedPost(completePost);
        resolve(completePost);
      }
      else {
        let postParser = new Parser();
        postParser.postMessage(rawData);

        completePost = { apartments: [] };
        postParser.addEventListener('message', (event) => {
          switch (event.data.type) {

            case 'gotPost':
              completePost = _.merge(completePost, event.data.payload);
              flux.getActions('posts').createNewPost(event.data.payload);
            break;

            case 'gotApartment':
              flux.getActions('apartments').createNewApartment(event.data.payload);
            break;

            case 'gotGeodata':
              completePost.apartments.push(
                _.merge({}, event.data.payload.apartment, { geo: event.data.payload.geodata })
              );

              let storedApartmentId = flux.getStore('apartments').getIdByKey('rawData', event.data.payload.apartment.rawData);

              flux.getActions('apartments').setGeodataForApartment(
                storedApartmentId,
                event.data.payload.geodata
              );
            break;

            case 'close':
              resolve(completePost);
              this.storePostToCache(completePost);
            break;

            default:
            break;
          }
        });
      }
    });

    promise.then(this.storePostToCache);
    return promise;
  }

  insertCachedPost (cachedPost) {
    console.info('Got cached post', cachedPost);

    let post = _.clone(cachedPost);
    delete post.apartments;
    flux.getActions('posts').createNewPost(post);

    cachedPost.apartments.forEach((apartment) => {
      flux.getActions('apartments').createNewApartment(apartment);
    });
  }

  storePostToCache (post) {
    return lscache.set(`post-${post.id}`, post, 10080); // 60*24*7
  }

  getPostFromCache (postId) {
    return lscache.get(`post-${postId}`);
  }
}

export default new Foreman();
