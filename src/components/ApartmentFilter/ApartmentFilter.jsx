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
      <div className="Filter">
        <div className="Filter-line">
          <div className="Filter-cell">
            <div className="Filter-section">
              <ButtonGroup
                name="type"
                payload={ filter.type }
                onChange={ this.handleChange.bind(this) }
                mods={ { 'layout': 'horisontal' } }
              >
                <span className="Filter-label">Тип</span>
              </ButtonGroup>
            </div>
            <div className="Filter-section">
              <ButtonGroup
                name="rooms"
                payload={ filter.rooms }
                onChange={ this.handleChange.bind(this) }
                disabled={ !_.findWhere(filter.type, { active: true }).hasRooms }
                mods={ { 'layout': 'horisontal' } }
              >
                <span className="Filter-label">Комнат</span>
              </ButtonGroup>
            </div>
          </div>
          <div className="Filter-cell">
            <div className="Filter-section">
              <Select
                name="city"
                payload={ filter.city }
                onChange={ this.handleChange.bind(this) }
              >
                <span className="Filter-label">Город</span>
              </Select>
            </div>
            <div className="Filter-section">
              <Select
                name="district"
                label="Район"
                payload={ filter.district }
                onChange={ this.handleChange.bind(this) }
                disabled={ !_.findWhere(filter.city, { active: true }).hasDistricts }
              >
                <span className="Filter-label">Район</span>
              </Select>
            </div>
          </div>
          <div className="Filter-cell">
            <div className="Filter-section">
              <Checkbox
                name="shouldHavePhotos"
                payload={ filter.shouldHavePhotos }
                onChange={ this.handleChange.bind(this) }
              >
                <span className="Filter-label Filter-label--wo-limit">Только с фото</span>
              </Checkbox>
            </div>
          </div>
        </div>
        <div className="Filter-line">
          <div className="Filter-cell">
            <div className="Filter-section">
              <Range
                name="price"
                min={ filter.price.min }
                max={ filter.price.max }
                step={ filter.price.step }
                mods={ { 'layout': 'horisontal' } }
                onChange={ this.handleChange.bind(this) }
              >
                <span className="Filter-label">Цена</span>
              </Range>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ApartmentFilter;
