import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import AnimalCrossing from './animalcrossing'
import Home from './home';
import MarketPrices from './marketprices'

import './App.css';

function App() {
  return (
    <Router>
        <Switch>
          <Route path="/animalcrossing">
            <AnimalCrossing />
          </Route>
          <Route path="/tcgmarketprices">
            <MarketPrices />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
    </Router>
  );
}

export default App;
