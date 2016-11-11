import React, { Component } from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router'
import { Provider } from 'react-redux'
import store, { history } from './lib/store'

import routes from './routes'



import './app.css';

class App extends Component {
  constructor() {
    super()
    fetch('http://localhost:8000/api/test')
      .then(response => {
        return response.json()
      })
      .then(json => {
        console.log(json)
      })
  }
  render() {
    return (
      <div className="App">
        <Provider store={store}>
          <Router history={history}>
            {routes}
          </Router>
        </Provider>
      </div>
    );
  }
}

export default App;
