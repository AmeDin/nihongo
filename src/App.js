import React from 'react';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppNavbar from './components/AppNavBar';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import store from './store';
import { Provider } from 'react-redux';
import ShigotoCard from './components/Shigoto/ShigotoCard';
import ShigotoAdmin from './components/Shigoto/ShigotoAdmin';
import VocabularyCard from './components/Vocabulary/VocabularyCard';
import VocabularyAdmin from './components/Vocabulary/VocabularyAdmin';
import Home from './components/Home';

function App() {
  return (
    <Provider store={store}>
        <div className="App">
        <BrowserRouter>
          <AppNavbar/>
          <div className="body">
            <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/shigoto' component={ShigotoCard} />
              <Route path='/shigotoAdmin' component={ShigotoAdmin} />
              <Route path='/vocabulary' component={VocabularyCard} />
              <Route path='/vocabularyAdmin' component={VocabularyAdmin} />
            </Switch>
          </div>
          </BrowserRouter>
        </div>
      </Provider>
  );
}

export default App;
