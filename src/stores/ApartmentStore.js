'use strict';

import React from 'react/addons';
import { Store } from 'flummox';
import _ from 'lodash';

import Filter from '../models/Filter';

class ApartmentStore extends Store {

  constructor (flux) {
    super();

    const apartmentActions = flux.getActions('apartments');
    this.apartmentCounter = 0;

    this.register(apartmentActions.createNewApartment, this.handleCreateNewApartment);
    this.register(apartmentActions.changeFilter, this.handleChangeFilter);

    this.state = {
      filter: Filter.getInitialState(),
      apartments: {}
    };
  }

  handleCreateNewApartment (apartment) {
    const id = this.apartmentCounter++;

    apartment.id = id;

    this.setState({
      apartments: React.addons.update(
        this.state.apartments,
        { $merge: { [id]: apartment } }
      )
    });
  }

  handleChangeFilter (changedSegment) {
    this.setState({
      filter: React.addons.update(
        this.state.filter,
        { $merge: changedSegment }
      )
    });
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
      return Filter.processApartment(apartment, filter);
    });
  }
}

export default ApartmentStore;
