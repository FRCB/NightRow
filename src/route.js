import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Homepage from './components/Homepage.js';
import Category from './components/Category.js';
import EventDetails from './components/EventDetails.js';
import AddEvent from './components/AddEvent.js';
import Reservations from './components/Reservations.js';
import Payment from './components/Payment.js';


export default (
  <Switch>
    <Route component={Homepage} path='/' exact />
    <Route component={Category} path='/category/:category' />
    <Route component={EventDetails} path='/event/:id' />
    <Route component={AddEvent} path='/add' />
    <Route component={Reservations} path='/reservations' />
    <Route component={Payment} path='/payment' />
  </Switch>
)