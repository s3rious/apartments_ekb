import { Actions } from 'flummox';

import _ from 'lodash';

import Apartment from '../models/Apartment';

class ApartmentActions extends Actions {

  createNewApartment (rawData, postId) {
    return new Apartment(rawData, postId);
  }

  changeFilter (changedSegment) {
    let key = [_.keys(changedSegment)[0]];
    let value = changedSegment[key];
    return { key, value };
  }
}

export default ApartmentActions;
