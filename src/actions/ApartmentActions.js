import { Actions, Store, Flummox } from 'flummox';

import Apartment from '../models/Apartment';

class ApartmentActions extends Actions {

  createNewApartment (rawData, postId) {
    return new Apartment(rawData, postId);
  }
}

export default ApartmentActions;
