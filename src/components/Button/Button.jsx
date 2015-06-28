import React from 'react/addons';
import classnames from 'classnames/dedupe';
import proccessMods from '../../helpers/processMods.js';

import Ink from 'react-ink';

import './Button.css';

class Button extends React.Component {

  static propTypes = {
    name: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    active: React.PropTypes.bool,
    mods: React.PropTypes.objectOf(React.PropTypes.string)
  }

  handleClick () {
    this.props.onClick();
  }

  render () {

    let classes = classnames(
      {
        'Button': true,
        'Button--disabled': this.props.disabled,
        'Button--active': this.props.active && !this.props.disabled
      },
      proccessMods(this.props.mods, 'Button'),
      this.props.className,
    );

    return (
      <button
        className={ classes }
        onClick={ this.handleClick.bind(this) }
      >
        { this.props.children }
        <Ink />
      </button>
    );
  }
}

export default Button;
