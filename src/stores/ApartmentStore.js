import { Actions, Store, Flummox } from 'flummox';

class ApartmentStore extends Store {

  constructor(flux) {
    super();

    const apartmentActions = flux.getActions('apartments');
    this.apartmentCounter = 0;

    this.register(apartmentActions.createNewApartment, this.handleCreateNewApartment);

    this.state = {};
  }

  handleCreateNewApartment (apartment) {
    const id = this.apartmentCounter++;

    this.setState({
      [id]: apartment
    });
  }
}

export default ApartmentStore;
