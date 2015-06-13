import _ from 'lodash';

import flux from '../flux';

class Post {

  constructor (post) {
    console.group('Post');

    this.id = post.id;
    this.rawData = post.text;
    this.isAd = false;

    if (/(объявление\ с\ комиссией|\: \реклама\ \:)/.test(this.rawData.toLowerCase())) {
      this.isAd = true;
    }

    console.info('Got new post: ${id}...', this);

    if (this.isAd) {
      this.apartments = [];
    }
    else {

      this.apartments = (
        _(post.text)
          .split(/Сда[е|ё]тся\:\ /)
          .filter(string => {
            return !(/^(-)+/.test(string));
          })
          .thru(function (rawArray) {
            console.info(`It has ${rawArray.length} apartments.`);
            return rawArray;
          })
          .map(string => {
            flux.getActions('apartments').createNewApartment(string, this.id);
          })
          .value()
      );
    }

    console.groupEnd('Post');
  };
}

export default Post;
