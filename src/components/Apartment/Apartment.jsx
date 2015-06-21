import React from 'react/addons';
import FluxComponent from 'flummox/component';
import flux from '../../flux';

class Apartment extends React.Component {

  render() {
    let apartment = this.props.data;

    return (
      <div className="Apartment card">
        <div className="card-content">
          <div className="Apartment-name card-title black-text">
            <div className="right">{ apartment.price.number }</div>
            { apartment.name }
          </div>
        </div>
      </div>
    );
  }
}

export default Apartment;
