import 'babel/polyfill';
import injectTapEventPlugin from 'react-tap-event-plugin';
import React from 'react/addons';
import App from './components/App/App.jsx';
import raf from 'react-raf-batching';

raf.inject();
injectTapEventPlugin();

rackup();

function rackup () {
  let mountNode = document.createElement('div');
  mountNode.id = 'App';
  mountNode.classList.add('App');
  document.body.appendChild(mountNode);

  React.render(<App/>, mountNode);
};
