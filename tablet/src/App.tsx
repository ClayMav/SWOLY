import React from 'react';
import logo from './logo.svg';
import './App.css';
import ApolloClient from 'apollo-boost'
import {ApolloProvider} from 'react-apollo'
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom'
import SWOLY_Staff from './SWOLY_Staff'
import Unoccupied from './components/screens/Unoccupied';
import Occupied from './components/screens/Occupied';

const App: React.FC = () => {
  return(routing);
}

const routing = (
    <Router>
      <div>
        <Switch>
          <Route path="/unoccupied" component={ Unoccupied } />
          <Route path="/occupied" component={ Occupied } />
        </Switch>
      </div>
    </Router>
)

export default App;
