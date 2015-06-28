import React from 'react/addons';
import _ from 'lodash';
import classnames from 'classnames/dedupe';
import proccessMods from '../../helpers/processMods.js';

import Button from '../Button/Button.jsx';

import './ButtonGroup.css';

class ButtonGroup extends React.Component {

  static propTypes = {
    name: React.PropTypes.string.isRequired,
    payload: React.PropTypes.array.isRequired,
    showDefault: React.PropTypes.bool,
    disabled: React.PropTypes.bool,
    mods: React.PropTypes.objectOf(React.PropTypes.string),
    onChange: React.PropTypes.function
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
        return this.props.showDefault || !button.isDefault;
      })
      .map(button => {

        return (
          <Button
            key={ button.name }
            className="ButtonGroup-button"
            onClick={ this.handleChange.bind(this, button) }
            active={ button.active }
            disabled={ this.props.disabled }
          >
            { button.name }
          </Button>
        );
      })
      .value();

    let classes = classnames(
      {
        'ButtonGroup': true,
        'ButtonGroup--disabled': this.props.disabled
      },
      proccessMods(this.props.mods, 'ButtonGroup')
    );

    return (

      <fieldset disabled={this.props.disabled || false}>
        <div className={ classes }>
          <label className="ButtonGroup-label">
            { this.props.children }
          </label>
          <div className="ButtonGroup-buttons">
            { buttons }
          </div>
        </div>
      </fieldset>
    );
  }
}

export default ButtonGroup;
