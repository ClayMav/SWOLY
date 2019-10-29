import React from 'react';
import logo from './logo.svg';
import './App.css';
<<<<<<< HEAD
import Unoccupied from './components/screens/Unoccupied';
import Occupied from './components/screens/Occupied';
=======
import ApolloClient from 'apollo-boost'
import {ApolloProvider} from 'react-apollo'
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom'
import SWOLY_Staff from './SWOLY_Staff'
import Unoccupied from './components/screens/Unoccupied';
import Occupied from './components/screens/Occupied';

const App: React.FC = () => {
  return(routing);
}
>>>>>>> feature/tablet_app

const routing = (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/unoccupied">Unoccupied</Link>
            </li>
            <li>
              <Link to="/occupied">Occupied</Link>
            </li>
            <li>
              <Link to="/unoccupied">Unoccupied</Link>
            </li>
            <li>
              <Link to="/occupied">Occupied</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
<<<<<<< HEAD
          <Route path="/about">
            <About />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/unoccupied" component={ Unoccupied } />
          <Route path="/occupied" component={ Occupied } />
          <Route path="/">
            <Home />
          </Route>
=======
          <Route path="/unoccupied" component={ Unoccupied } />
          <Route path="/occupied" component={ Occupied } />
>>>>>>> feature/tablet_app
        </Switch>
      </div>
    </Router>
)

export default App;
