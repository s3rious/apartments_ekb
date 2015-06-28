import 'babel/polyfill';
import flux from './flux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import _ from 'lodash';

injectTapEventPlugin();

import './components/App/App.jsx';

window.flux = flux;
