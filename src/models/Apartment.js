import _ from 'lodash';
import fetch from 'isomorphic-fetch';

import { applyTests, processExcluded } from '../helpers/apartment-regex-tests.js';

class Apartment {

  constructor (rawData, postId) {
    this.postId = postId;
    this.rawData = rawData;
    this.rejectReasons = [];

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

    console.info(`Got an new apartment from post: ${postId}...`, this);
  }

  getGeoData () {

    return new Promise((resolve, reject) => {

      let fetchGeodataFromGoogle = async () => {
        try {
          let location = `${this.address.city} ${this.address.street}`;
          console.info(`Try to get geodata for ${location}`, this);
          let response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${location}&language=ru&key=AIzaSyBRHBOPTA0M5_HF-U1T4yEv6ST5PXRCduU`);
          let data = await response.json();

          if (data.status === 'ZERO_RESULTS') {
            throw new Error('Zero results');
          }

          if (data.status === 'OVER_QUERY_LIMIT') {
            if (data.error_message === 'You have exceeded your rate-limit for this API.') {
              setTimeout(fetchGeodataFromGoogle.bind(this), 1000);
            }
            else {
              throw new Error('Stuck at qouta limits');
            }
          }

          if (data.results.length > 0) {
            let geo = data.results[0].geometry.location;
            console.info(`Geo geodata for ${location}`, geo);
            resolve(geo);
          }
        }
        catch (error) {
          console.error('Something went wrong, apartment will be excluded', error);
          reject(error);
        }
      };

      fetchGeodataFromGoogle();
    });
  }
}

export default Apartment;
