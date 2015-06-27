import React from 'react/addons';
import _ from 'lodash';

import Apartment from '../Apartment/Apartment.jsx';

class ApartmentList extends React.Component {

  render () {
    let apartments = this.props.apartments;

    let oddEvenAparments = {
      odd: _.filter(apartments, (value, index) => {
        return index % 2 !== 0;
      }),
      even: _.filter(apartments, (value, index) => {
        return index % 2 === 0;
      })
    };

    return (
      <div className="ApartmentsList row">
        <div className="col s6">
          {_.map(oddEvenAparments.odd, function (apartment) {
            return (
              <div
                key={ apartment.id }
                className="Apartments-apartment"
              >
                <Apartment data={ apartment } />
              </div>);
          })}
        </div>
        <div className="col s6">
          {_.map(oddEvenAparments.even, function (apartment) {
            return (
              <div
                key={ apartment.id }
                className="Apartments-apartment"
              >
                <Apartment data={ apartment } />
              </div>);
          })}
        </div>
      </div>
    );
  }
}

export default ApartmentList;
