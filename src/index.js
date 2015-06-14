import 'babel/polyfill';
// import './helpers/batchingStrategy.js';
import flux from './flux';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import './components/App.jsx';

flux.getActions('posts').fetchNext();
window.flux = flux;
