import React from 'react/addons';
import FluxComponent from 'flummox/component';
import flux from '../flux';

import _ from 'lodash';
import classnames from 'classnames/dedupe';

import ButtonGroup from './ButtonGroup.jsx';
import Checkbox from './Checkbox.jsx';

class Select extends React.Component {

  static propTypes = {
    name: React.PropTypes.string.isRequired,
    label: React.PropTypes.string.isRequired,
    payload: React.PropTypes.array.isRequired,
    disabled: React.PropTypes.bool
  }

  handleChange (selectedValue) {
    let value = selectedValue.target.value;
    let selectedOption = _.findWhere(this.props.payload, { name: value });

    let payload = _.clone(this.props.payload);

    payload.forEach((option) => {
      option.active = option.name === selectedOption.name;
    });

    this.props.onChange({
      [this.props.name]: payload
    });
  }

  render () {

    let options = _(this.props.payload)
      .chain()
      .map(option => {

        return (
          <option
            key={ option.name }
          >
            { option.name }
          </option>
        );
      })
      .value();

    let classes = classnames({
      'Select': true,
      'Select--disabled': this.props.disabled
    });

    return (

      <fieldset
        className={ classes }
        disabled={this.props.disabled || false}
      >
        <label>
          <span className="Select-label">
            { this.props.label }
          </span>
          <select
            className="Select-select"
            onChange={ this.handleChange.bind(this) }
            defaultValue={ _.findWhere(this.props.payload, { active: true }) }
          >
            { options }
          </select>
        </label>
      </fieldset>
    )
  }
}

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
