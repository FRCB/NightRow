import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Homepage from './components/Homepage/Homepage';
import Category from './components/Category/Category';
import EventDetails from './components/EventDetails/EventDetails';
import AddEvent from './components/AddEvent/AddEvent';
import Reservations from './components/Reservations/Reservations';
// import Cart from './components/Cart/Cart';


export default (
  <Switch>
    <Route component={Homepage} path='/' exact />
    <Route component={Category} path='/category/:category' />
    <Route component={EventDetails} path='/event/:id' />
    <Route component={AddEvent} path='/add' />
    <Route component={Reservations} path='/reservations' />
    {/* <Route component={Cart} path='/cart' /> */}
  </Switch>
)