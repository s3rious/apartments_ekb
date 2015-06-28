import _ from 'lodash';
import fetch from 'isomorphic-fetch';
import { applyTests, processExcluded } from '../helpers/apartment-regex-tests.js';

import flux from '../flux.js';

// Dirty
let forceUpdate = _.debounce(() => {
  flux.getStore('apartments').forceUpdate();
}, 500);

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

    if (this.rejectReasons.indexOf('unknown location') === -1) {
      this.getGeoData();
    }

    console.groupEnd('Apartment');
  }

  async getGeoData () {
    let location = `${this.address.city} ${this.address.street}`;

    try {
      console.info(`Try to get geodata for ${location}`, this);
      let response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${location}&language=ru&key=AIzaSyBRHBOPTA0M5_HF-U1T4yEv6ST5PXRCduU`);
      let data = await response.json();

      if (data.status === 'ZERO_RESULTS') {
        throw new Error('Zero results');
      }

      if (data.status === 'OVER_QUERY_LIMIT') {
        setTimeout(this.getGeoData.bind(this), 1000);
      }

      if (data.results.length > 0) {
        let geo = data.results[0].geometry.location;
        this.address.geo = geo;
        console.info(`Geo geodata for ${location}`, data.results[0], this);
        forceUpdate();
      }
    }
    catch (error) {
      console.error('Something went wrong, apartment will be excluded', error);
      this.rejectReasons.push('unknown location');
    }
  }
}

export default Apartment;
