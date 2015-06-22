import React from 'react/addons';

import _ from 'lodash';
import ReactSlider from 'react-slider';
import classnames from 'classnames/dedupe';

import './Range.css';

class Range extends React.Component {

  static propTypes = {
    min: React.PropTypes.number,
    max: React.PropTypes.number,
    step: React.PropTypes.number,
    disabled: React.PropTypes.bool,
    onChange: React.PropTypes.func
  }

  state = {
    from: this.props.min,
    to: this.props.max
  }

  handleChange (values) {

    this.setState({
      from: values[0],
      to: values[1]
    })
  }

  handleAfterChange () {

    console.log(this.state.from, this.state.to)

    this.props.onChange({
      [this.props.name]: {
        from: this.state.from,
        to: this.state.to >= this.props.max ? Infinity : this.state.to
      }
    });
  }

  render () {

    let classes = classnames(
      _.extend(
        {
          'Range': true,
          'Range--disabled': this.props.disabled
        },
        _(this.props.mods)
          .chain()
          .map((a, b) => { return `Range--${b}--${a}`; })
          .thru((classname) => { return { [classname]: true }; })
          .value()
      )
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
        </label>
      </fieldset>
    );
  }
};

export default Range;
