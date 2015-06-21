import React from 'react/addons';

import _ from 'lodash';
import classnames from 'classnames/dedupe';

class ButtonGroup extends React.Component {

  static propTypes = {
    name: React.PropTypes.string.isRequired,
    label: React.PropTypes.string.isRequired,
    payload: React.PropTypes.array.isRequired,
    showDefault: React.PropTypes.bool,
    disabled: React.PropTypes.bool
  }

  handleChange (clickedButton) {
    let payload = _.clone(this.props.payload);

    payload.forEach((button) => {
      button.active = button.name === clickedButton.name ? !button.active : false;
    });

    if (!_.findWhere(payload, { active: true })) {
      _.findWhere(payload, { isDefault: true }).active = true;
    }

    this.props.onChange({
      [this.props.name]: payload
    });
  }

  render () {

    let buttons = _(this.props.payload)
      .chain()
      .filter(button => {
        return this.props.showDefault ? true : button.isDefault ? false : true;
      })
      .map(button => {

        let classes = classnames({
          'Button': true,
          'ButtonGroup-button': true,
          'Button--active': button.active
        });

        return (
          <button
            key={ button.name }
            className={ classes }
            onClick={ this.handleChange.bind(this, button) }
          >
            { button.name }
          </button>
        );
      })
      .value();

    let classes = classnames({
      'ButtonGroup': true,
      'ButtonGroup--disabled': this.props.disabled
    });

    return (

      <fieldset
        className={ classes }
        disabled={this.props.disabled || false}
      >
        <label className="ButtonGroup-label">
          { this.props.label }
        </label>
        <div className="ButtonGroup-buttons">
          { buttons }
        </div>
      </fieldset>
    )
  }
}

export default ButtonGroup;
