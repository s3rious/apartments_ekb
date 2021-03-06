import React from 'react/addons';

import classnames from 'classnames/dedupe';
import processMods from '../../helpers/processMods.js';
import prettifyPrice from '../../helpers/prettifyPrice';

import ReactSlider from 'react-slider';

import './Range.css';

class Range extends React.Component {

  static propTypes = {
    min: React.PropTypes.number,
    max: React.PropTypes.number,
    step: React.PropTypes.number,
    disabled: React.PropTypes.bool,
    onChange: React.PropTypes.func,
    mods: React.PropTypes.objectOf(React.PropTypes.string)
  }

  state = {
    from: this.props.min,
    to: this.props.max
  }

  handleChange (values) {

    this.setState({
      from: values[0],
      to: values[1]
    });
  }

  handleAfterChange () {

    this.props.onChange({
      [this.props.name]: {
        from: this.state.from,
        to: this.state.to >= this.props.max ? Infinity : this.state.to
      }
    });
  }

  render () {

    let classes = classnames(
      {
        'Range': true,
        'Range--disabled': this.props.disabled
      },
      processMods(this.props.mods, 'Range')
    );

    return (
      <fieldset disabled={ this.props.disabled }>
        <label className={ classes }>
          {
            this.props.children
              ?
                <span className="Range-label">
                  { this.props.children }
                </span>
              :
                null
          }
          <div className="Range-holder">
            <span className="Range-from">
              { prettifyPrice(this.state.from) }
            </span>
            <ReactSlider
              min={ this.props.min }
              max={ this.props.max }
              defaultValue={ [this.props.min, this.props.max] }
              step={ this.props.step }
              minDistance={ this.props.step }
              withBars={ true }
              pearling={ true }
              className="Range-range"
              barClassName="Range-bar"
              handleClassName="Range-handle"
              handleActiveClassName="Range-handle--active"
              disabled={ this.props.disabled }
              onChange={ this.handleChange.bind(this) }
              onAfterChange={ this.handleAfterChange.bind(this) }
            />
            <span className="Range-to">
              { prettifyPrice(this.state.to) }
            </span>
          </div>
        </label>
      </fieldset>
    );
  }
};

export default Range;
