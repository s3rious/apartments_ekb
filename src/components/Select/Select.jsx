import React from 'react/addons';

import _ from 'lodash';
import classnames from 'classnames/dedupe';

import './Select.css';

class Select extends React.Component {

  static propTypes = {
    name: React.PropTypes.string.isRequired,
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
        <span className="Select-label">
          { this.props.children }
        </span>
        <select
          className="Select-select"
          onChange={ this.handleChange.bind(this) }
          defaultValue={ _.findWhere(this.props.payload, { active: true }) }
        >
          { options }
        </select>
      </fieldset>
    )
  }
}

export default Select;
