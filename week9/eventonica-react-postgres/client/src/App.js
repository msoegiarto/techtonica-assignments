import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import SearchEvents from './components/SearchEvents.jsx';
import ViewEvents from './components/ViewEvents.jsx';
import ViewUsers from './components/ViewUsers.jsx';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Route exact path='/' component={SearchEvents} />
        <Route exact path='/view' component={ViewEvents} />
        <Route exact path="/user" component={ViewUsers} />
      </div>
    </BrowserRouter>
  );
}

export default App;