import { Actions } from 'flummox';

import _ from 'lodash';

class ApartmentActions extends Actions {

  createNewApartment (apartment) {
    return apartment;
  }

  setGeodataForApartment (apartmentId, geodata) {
    return { id: apartmentId, geodata: geodata };
  }

  changeFilter (changedSegment) {
    let key = [_.keys(changedSegment)[0]];
    let value = changedSegment[key];
    return { key, value };
  }
}

export default ApartmentActions;
