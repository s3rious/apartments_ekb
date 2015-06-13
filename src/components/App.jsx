import React from 'react';
import FluxComponent from 'flummox/component';
import flux from '../flux';

import ApartmentList from './ApartmentList.jsx';

class App extends React.Component {

  render () {
    return (
      <FluxComponent flux={flux}>
        <FluxComponent
          connectToStores={{
            apartments: store => ({ apartments: store.state })
          }}
        >
          <ApartmentList />
        </FluxComponent>
      </FluxComponent>
    );
  }
}

let mountNode = document.getElementById('App');
React.render(<App/>, mountNode);
