/** @jsx h */
import { h } from 'preact';
import { Router } from 'preact-router';
import { Provider } from "redux-zero/preact";
import store from "../redux/store";

import Header from './header';

// Code-splitting is automated for `routes` directory
import Home from '../routes/home';

const App = function() {
  return (
    <Provider store={store}>
      <div id='app'>
        <Header title='Jokes' />
        <Router>
          <Home path='/' />
        </Router>
      </div>
    </Provider>
  )
}

export default App;
