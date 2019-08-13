import React from 'react';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppNavbar from './components/AppNavBar';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import store from './store';
import { Provider } from 'react-redux';
import ShigotoCard from './components/ShigotoCard';
import ShigotoList from './components/ShigotoList';

function App() {
  return (
    <Provider store={store}>
        <div className="App">
        <BrowserRouter>
          <AppNavbar/>
          <div className="body">
            <Switch>
              <Route exact path='/' component={ShigotoList} />
              <Route path='/shigoto' component={ShigotoCard} />
            </Switch>
          </div>
          </BrowserRouter>
        </div>
      </Provider>
  );
}

export default App;
