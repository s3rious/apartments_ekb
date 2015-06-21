import React from 'react/addons';

import classnames from 'classnames/dedupe';

class Checkbox extends React.Component {

  static propTypes = {
    name: React.PropTypes.string.isRequired,
    label: React.PropTypes.string.isRequired,
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
      <fieldset
        className={ classes }
        disabled={ this.props.disabled }
      >
        <label>
          <input
            className="Checkbox-check"
            type="checkbox"
            checked={ this.props.payload }
            onChange={ this.handleChange.bind(this) }
          />
          <span className="Checkbox-label">{ this.props.label }</span>
        </label>
      </fieldset>
    );
  }
}

export default Checkbox;
