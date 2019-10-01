import React, {Suspense, lazy} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
// import logo from './logo.svg';
import './App.css';

import dash from "./dash";
import registrationForm from "./form";

// const App: React.FC = () => {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.tsx</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// const Dashboard = lazy(() => import('./dash'))
// const registrationForm = lazy(() => import('./form'))

const App = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact path="/" component={dash}/>
        <Route path="/register" component={registrationForm}/>
      </Switch>
    </Suspense>
  </Router>
);

export default App;
