import 'babel/polyfill';
import flux from './flux';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import './components/App/App.jsx';

flux.getActions('posts').fetchNext();
window.flux = flux;
