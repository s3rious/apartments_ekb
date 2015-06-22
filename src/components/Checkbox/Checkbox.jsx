import React from 'react/addons';

import classnames from 'classnames/dedupe';

import './Checkbox.css';

class Checkbox extends React.Component {

  static propTypes = {
    name: React.PropTypes.string.isRequired,
    payload: React.PropTypes.bool.isRequired,
    disabled: React.PropTypes.bool
  }

  handleChange () {

    this.props.onChange({
      [this.props.name]: !this.props.payload
    });
  }

  render () {

    let classes = classnames({
      'Checkbox': true,
      'Checkbox--disabled': this.props.disabled,
      'Checkbox--active': this.props.payload
    });

    return (
      <fieldset disabled={ this.props.disabled }>
        <label className={ classes }>
          <input
            className="Checkbox-check"
            type="checkbox"
            checked={ this.props.payload }
            onChange={ this.handleChange.bind(this) }
          />
          {
            this.props.children
              ?
                <span className="Checkbox-label">
                  { this.props.children }
                </span>
              :
                null
          }
        </label>
      </fieldset>
    );
  }
}

export default Checkbox;
