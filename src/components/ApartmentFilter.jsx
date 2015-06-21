import React from 'react/addons';
import FluxComponent from 'flummox/component';
import flux from '../flux';

import _ from 'lodash';

import ButtonGroup from './ButtonGroup.jsx';
import Checkbox from './Checkbox.jsx';
import Select from './Select.jsx';

class ApartmentFilter extends React.Component {

  handleChange (changedSegment) {
    let actions = this.props.flux.getActions('apartments');
    actions.changeFilter(changedSegment);
  }

  render () {
    let filter = this.props.filter;

    return (
      <div className="Filter">
        <div className="Filter-line Filter-line--first">
          <ButtonGroup
            label="Тип жилья"
            name="type"
            payload={ filter.type }
            onChange={ this.handleChange.bind(this) }
          />
          <ButtonGroup
            label="Количество комнат"
            name="rooms"
            payload={ filter.rooms }
            onChange={ this.handleChange.bind(this) }
            disabled={ !_.findWhere(filter.type, { active: true }).hasRooms }
          />
          <Checkbox
            label="Только с фото"
            name="shouldHavePhotos"
            payload={ filter.shouldHavePhotos }
            onChange={ this.handleChange.bind(this) }
          >
          </Checkbox>
        </div>
        <div className="Filter-line Filter-line--second">
          <Select
            name="city"
            label="Город"
            payload={ filter.city }
            onChange={ this.handleChange.bind(this) }
          />
          <Select
            name="district"
            label="Район"
            payload={ filter.district }
            onChange={ this.handleChange.bind(this) }
            disabled={ !_.findWhere(filter.city, { active: true }).hasDistricts }
          />
        </div>
      </div>
    );
  }
}

export default ApartmentFilter;
