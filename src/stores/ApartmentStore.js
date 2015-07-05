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
    this.register(apartmentActions.setGeodataForApartment, this.handleSetGeodataForApartment);
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

  handleSetGeodataForApartment (data) {

    this.setState({
      apartments: React.addons.update(
        this.state.apartments,
        { [data.id]: { $merge: { geo: data.geodata } } }
      )
    });
  }

  handleChangeFilter (newFilter) {
    let op = _.isObject(this.state.filter[newFilter.key]) ? '$merge' : '$set'; // Array is fine too

    this.setState({
      filter: React.addons.update(
        this.state.filter,
        { [newFilter.key]: { [op]: newFilter.value } }
      )
    });
  }

  getIdByKey (key, value) {
    // TODO: Get rid of that bullshit
    return _(this.state.apartments)
      .chain()
      .pairs()
      .filter(function (pair) {
        return pair[1][key] === event.data.payload.apartment[key];
      }).value()[0][0];
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

  getSelectedCity () {
    return _.where(this.state.filter.city, { active: true })[0];
  }
}

export default ApartmentStore;
