import React from 'react/addons';
import FluxComponent from 'flummox/component';
import flux from '../flux';

import ApartmentList from './ApartmentList.jsx';
import ApartmentFilter from './ApartmentFilter.jsx';
import ApartmentMap from './ApartmentMap.jsx';

import './App.css';

class App extends React.Component {

  render () {
    return (
      <main className="App-main">
        <div className="App-container">

          <div className="row">
            <div className="App-filter App-col col s8">
              <FluxComponent
                flux={flux}
                connectToStores={{
                  apartments: store => ({ filter: store.state.filter })
                }}
              >
                <ApartmentFilter />
              </FluxComponent>
            </div>
          </div>

          <div className="row">

            <div className="App-apartments App-col col s8">
              <FluxComponent
                flux={flux}
                connectToStores={{
                  apartments: store => ({ apartments: store.getFiltered() })
                }}
              >
                <ApartmentList />
              </FluxComponent>
            </div>

            <div className="App-map App-col grey lighten-2 col s4 z-depth-1">
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

        </div>
      </main>
    );
  }
}

let mountNode = document.getElementById('App');
React.render(<App/>, mountNode);
