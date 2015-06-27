import _ from 'lodash';

import { applyTests, processExcluded } from '../helpers/apartment-regex-tests.js';

class Apartment {

  constructor (rawData, postId) {
    console.group('Apartment');

    this.postId = postId;
    this.rawData = rawData;
    this.rejectReasons = [];
    console.info(`Got an apartment from post: ${this.postId}...`, this);

    _(rawData)
      .split(/\n/)
      .filter(string => {
        return string.length > 0;
      })
      .each(string => {
        applyTests(string, this);
      })
      .value();

    processExcluded(this);

    console.groupEnd('Apartment');
  }
}

export default Apartment;
