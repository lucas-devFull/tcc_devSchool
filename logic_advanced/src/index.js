import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery';
import 'popper.js';
import 'bootstrap/dist/js/bootstrap';

import React from 'react';
import ReactDOM from 'react-dom';

import Route from './routes';
import * as Icons from '@fortawesome/free-solid-svg-icons';
import {library} from '@fortawesome/fontawesome-svg-core';

const IconsList = Object.keys(Icons).filter(iconName => iconName !== 'fas' && iconName !== 'prefix').map(icon => Icons[icon]);
library.add(...IconsList);

ReactDOM.render(
  <React.StrictMode>
    	<Route />
  </React.StrictMode>,
  document.getElementById('root')
);

