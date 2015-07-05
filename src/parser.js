/* eslint-env worker */

import 'babel/polyfill';
import Post from './models/Post.js';
import Apartment from './models/Apartment.js';

self.addEventListener('message', (event) => {
  let terminate = () => {
    postMessage({ type: 'close' });
    self.close();
  };

  let post = new Post(event.data);
  postMessage({ type: 'gotPost', payload: post });

  if (post.isAd) {
    terminate();
  }

  let apartments = event.data.text
    .split(/Сда[е|ё]тся\:\ /)
    .filter(string => {
      return !(/^(-)+/.test(string));
    })
    .map(string => {
      let apartment = new Apartment(string, post.id);
      postMessage({ type: 'gotApartment', payload: apartment });
      return apartment;
    });

  let geoPromises = [];

  apartments
    .filter((apartment) => {
      return apartment.address && apartment.address.city && apartment.address.street;
    })
    .forEach((apartment) => {
      let get = apartment.getGeoData();
      geoPromises.push(get);
      get.then((geodata) => {
        postMessage({
          type: 'gotGeodata',
          payload: { apartment: apartment, geodata: geodata } }
        );
      });
    });

  Promise
    .all(geoPromises)
    .then(() => {
      terminate();
    })
    .catch(() => {
      terminate();
    });

  if (geoPromises.length < 1) {
    terminate();
  }
});
