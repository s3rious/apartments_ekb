import React from 'react/addons';
import FluxComponent from 'flummox/component';
import flux from '../../flux';

import ApartmentList from '../ApartmentList/ApartmentList.jsx';
import ApartmentFilter from '../ApartmentFilter/ApartmentFilter.jsx';
import ApartmentMap from '../ApartmentMap/ApartmentMap.jsx';

import './App.css';

class App extends React.Component {

  render () {
    return (
      <main className="App-main">
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
          </div>

          <div className="App-map">
            <FluxComponent
              flux={flux}
              connectToStores={{
                apartments: store => ({ apartments: store.getFiltered() })
              }}
            >
              <ApartmentMap />
            </FluxComponent>
          </div>

        </div>
      </main>
    );
  }
}

let mountNode = document.getElementById('App');
React.render(<App/>, mountNode);
