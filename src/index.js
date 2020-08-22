import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
// import {Collapse} from 'react-collapse';
import './index.css';
import Log from './Log';
import App from './App';
import Operate from './views/OperateView'
import 'antd/dist/antd.dark.css'
import 'antd/dist/antd.compact.css'

import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    (
        <Router basename={process.env.PUBLIC_URL}>
            <Switch>
                <Route path={"/Main"} component={App} />
                <Route path={"/"} exact component={Operate} />
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
