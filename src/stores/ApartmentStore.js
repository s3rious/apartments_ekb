'use strict';

import React from 'react/addons';
import { Store } from 'flummox';
import _ from 'lodash';

class ApartmentStore extends Store {

  constructor (flux) {
    super();

    const apartmentActions = flux.getActions('apartments');
    this.apartmentCounter = 0;

    this.register(apartmentActions.createNewApartment, this.handleCreateNewApartment);
    this.register(apartmentActions.changeFilter, this.handleChangeFilter);

    this.state = {
      filter: {
        withoutRejected: true,
        type: null,
        rooms: null
      },
      apartments: {}
    };
  }

  handleCreateNewApartment (apartment) {
    const id = this.apartmentCounter++;

    this.setState({
      apartments: React.addons.update(
        this.state.apartments,
        { $merge: { [id]: apartment } }
      )
    });
  }

  handleChangeFilter (filter) {

  }

  get (id) {
    return this.state.apartments[id];
  }

  getAll () {
    return this.state.apartments;
  }

  getFiltered () {
    let filter = this.state.filter;

    return _.filter(this.state.apartments, (apartment) => {
      if (filter.withoutRejected && apartment.rejectReasons.length > 0) {
        return false;
      }
      else if (filter.type !== null && (filter.type !== apartment.type)) {
        return false;
      }
      else if (filter.type === 'apartment' && filter.rooms !== null && (filter.rooms !== apartment.rooms)) {
        return false;
      }
      else {
        return true;
      }
    });
  }
}

export default ApartmentStore;
