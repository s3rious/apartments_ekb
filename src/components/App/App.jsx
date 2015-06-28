import React from 'react/addons';
import FluxComponent from 'flummox/component';
import flux from '../../flux';
import _ from 'lodash';

import ApartmentList from '../ApartmentList/ApartmentList.jsx';
import ApartmentFilter from '../ApartmentFilter/ApartmentFilter.jsx';
import ApartmentMap from '../ApartmentMap/ApartmentMap.jsx';
import Button from '../Button/Button.jsx';

import './App.css';

class App extends React.Component {

  // Dirty stuff
  loadMore () {
    let postsLength = _.keys(flux.getStore('posts').state.posts).length;

    flux.getActions('posts').fetchNext(postsLength, 10);
  }

  componentDidMount () {
    this.loadMore();
  }

  render () {

    return (
      <div className="App-container">

        <div className="App-filter">
          <FluxComponent
            flux={flux}
            connectToStores={{
              apartments: store => ({ filter: store.state.filter })
            }}
          >
            <ApartmentFilter />
          </FluxComponent>
        </div>

        <div className="App-apartments">
          <FluxComponent
            flux={flux}
            connectToStores={{
              apartments: store => ({ apartments: store.getFiltered() })
            }}
          >
            <ApartmentList />
          </FluxComponent>
          <Button
            className="App-fetchMore Card Card--shadow--1"
            onClick={this.loadMore.bind(this)}
            mods={ { style: 'without-round-corners', size: 'block-size', padding: '2x' } }
          >
            Загрузить ещё
          </Button>
        </div>

        <div className="App-map">
          <FluxComponent
            flux={flux}
            connectToStores={{
              apartments: store => ({
                apartments: store.getFiltered(),
                selectedCity: store.getSelectedCity()
              })
            }}
          >
            <ApartmentMap />
          </FluxComponent>
        </div>

      </div>
    );
  }
}

let mountNode = document.getElementById('App');
React.render(<App/>, mountNode);
