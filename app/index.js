import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory, Router } from 'react-router';
import routes from './config/routes.js';


ReactDOM.render(<Router history={browserHistory} routes={routes} />
  , document.getElementById('app'));
