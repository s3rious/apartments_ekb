import { Actions, Store, Flummox } from 'flummox';

import _ from 'lodash';

import Apartment from '../models/Apartment';

class ApartmentActions extends Actions {

  createNewApartment (rawData, postId) {
    return new Apartment(rawData, postId);
  }

  changeFilter (changedSegment) {
    return changedSegment;
  }
}

export default ApartmentActions;
