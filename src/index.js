import 'babel/polyfill';
import flux from './flux';

import App from './components/App.jsx';

flux.getActions('posts').fetchNext();
window.flux = flux;
