import _ from 'lodash';

import applyTests from '../helpers/apartment-regex-tests.js';

class Apartment {

  constructor (rawData, postId) {
    console.group('Apartment');

    this.postId  = postId;
    this.rawData  = rawData;
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

    if (!this.price || !this.price.number || _(this.price.number).isNaN() || this.price.number < 1) {
      this.rejectReasons.push('unknown price');
      console.warn('... got a possible mismatch or unknown price, apartment will be excluded', this);
    }

    if (!this.address || (!this.address.district && this.address.city === 'Екатеринбург')) {
      this.rejectReasons.push('unknown location');
      console.warn('... got a possible mismatch or unknown city, apartment will be excluded', this);
    }

    if (!this.type) {
      this.rejectReasons.push('unknown type');
      console.warn('... got a possible mismatch or unknown type, apartment will be excluded', this);
    }

    console.groupEnd('Apartment');
  }
}

export default Apartment;
