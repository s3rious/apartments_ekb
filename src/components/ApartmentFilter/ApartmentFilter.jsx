import React from 'react/addons';

import _ from 'lodash';

import ButtonGroup from '../ButtonGroup/ButtonGroup.jsx';
import Checkbox from '../Checkbox/Checkbox.jsx';
import Select from '../Select/Select.jsx';
import Range from '../Range/Range.jsx';

import './ApartmentFilter.css';

class ApartmentFilter extends React.Component {

  handleChange (changedSegment) {
    let actions = this.props.flux.getActions('apartments');
    actions.changeFilter(changedSegment);
  }

  render () {
    let filter = this.props.filter;

    return (
      <div className="ApartmentFilter">
        <div className="ApartmentFilter-line">
          <div className="ApartmentFilter-cell">
            <div className="ApartmentFilter-section">
              <ButtonGroup
                name="type"
                payload={ filter.type }
                onChange={ this.handleChange.bind(this) }
                mods={ { 'layout': 'horisontal' } }
              >
                <span className="ApartmentFilter-label">Тип</span>
              </ButtonGroup>
            </div>
            <div className="ApartmentFilter-section">
              <ButtonGroup
                name="rooms"
                payload={ filter.rooms }
                onChange={ this.handleChange.bind(this) }
                disabled={ !_.findWhere(filter.type, { active: true }).hasRooms }
                mods={ { 'layout': 'horisontal' } }
              >
                <span className="ApartmentFilter-label">Комнат</span>
              </ButtonGroup>
            </div>
          </div>
          <div className="ApartmentFilter-cell">
            <div className="ApartmentFilter-section">
              <Select
                name="city"
                payload={ filter.city }
                onChange={ this.handleChange.bind(this) }
              >
                <span className="ApartmentFilter-label">Город</span>
              </Select>
            </div>
            <div className="ApartmentFilter-section">
              <Select
                name="district"
                label="Район"
                payload={ filter.district }
                onChange={ this.handleChange.bind(this) }
                disabled={ !_.findWhere(filter.city, { active: true }).hasDistricts }
              >
                <span className="ApartmentFilter-label">Район</span>
              </Select>
            </div>
          </div>
          <div className="ApartmentFilter-cell">
            <div className="ApartmentFilter-section">
              <Checkbox
                name="shouldHavePhotos"
                payload={ filter.shouldHavePhotos }
                onChange={ this.handleChange.bind(this) }
              >
                <span className="ApartmentFilter-label ApartmentFilter-label--wo-limit">Только с фото</span>
              </Checkbox>
            </div>
          </div>
        </div>
        <div className="ApartmentFilter-line">
          <div className="ApartmentFilter-cell">
            <div className="ApartmentFilter-section">
              <Range
                name="price"
                min={ filter.price.min }
                max={ filter.price.max }
                step={ filter.price.step }
                mods={ { 'layout': 'horisontal' } }
                onChange={ this.handleChange.bind(this) }
              >
                <span className="ApartmentFilter-label">Цена</span>
              </Range>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ApartmentFilter;
