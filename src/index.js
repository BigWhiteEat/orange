import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import './index.css';
import Log from './views/Log';
import App from './App';

import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    (
        <Router>
            <Switch>
                <Route path={"/"} exact component={Log} />
                <Route path={"/Main"} component={App} />
            </Switch>
        </Router>
    ),
  document.getElementById('root')
);

// <React.StrictMode>
//   <App />
// {</React.StrictMode>,}
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
