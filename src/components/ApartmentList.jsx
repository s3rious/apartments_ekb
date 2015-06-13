import React from 'react';
import FluxComponent from 'flummox/component';
import flux from '../flux';
import _ from 'lodash';

import Apartment from './Apartment.jsx';

class ApartmentList extends React.Component {

  render() {
    let apartments = this.props.apartments;

    return (
      <div className="Apartments">
        {_.map(apartments, function (apartment) {
          return (
            <div className="Apartments-apartment">
              <Apartment data={ apartment } />
            </div>);
        })}
      </div>
    );
  }
}

export default ApartmentList;
