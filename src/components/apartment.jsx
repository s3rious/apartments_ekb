import React from 'react';
import FluxComponent from 'flummox/component';
import flux from '../flux';

class Apartment extends React.Component {

  render() {
    let apartment = this.props.data;

    return (
      <div className="Apartment">
        { apartment.name }
      </div>
    );
  }
}

export default Apartment;
