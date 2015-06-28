import React from 'react/addons';
import _ from 'lodash';
import classnames from 'classnames/dedupe';

import Apartment from '../Apartment/Apartment.jsx';

import './ApartmentsList.css';
import '../Card/Card.css';
import '../Grid/Grid.css';

class ApartmentList extends React.Component {

  state = {
    columns: 1
  }

  handleResize (e) {
    let grid = React.findDOMNode(this.refs.grid);
    let gridInnerWidth = (grid.clientWidth || grid.outerWidth) - parseInt(window.getComputedStyle(grid).marginTop, 10);
    let mixCellWidth = 320;
    let columns = Math.floor(gridInnerWidth / mixCellWidth);
    columns = columns > 0 ? columns : 1;

    this.setState({
      columns: columns
    });
  }

  componentDidMount () {
    this.handleResize();

    window.addEventListener(
      'resize',
      _.debounce(this.handleResize.bind(this), 50)
    );
  }

  componentWillUnmount () {
    window.removeEventListener(
      'resize',
      _.debounce(this.handleResize.bind(this), 50)
    );
  }

  render () {

    let classes = classnames([
      'ApartmentsList',
      'Grid',
      `Grid--columns--${this.state.columns}`
    ]);

    return (
      <div
        className={ classes }
        ref="grid"
      >
        {_.map(this.props.apartments, function (apartment) {
          return (
            <div
              key={ apartment.id }
              className="Grid-cell ApartmentsList-apartment"
            >
              <div className="Card Card--shadow--1 ApartmentsList-card">
                <Apartment data={ apartment } />
              </div>
            </div>);
        })}
      </div>
    );
  }
}

export default ApartmentList;
