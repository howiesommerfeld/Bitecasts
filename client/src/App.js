import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Link, HashRouter as Router, Route } from 'react-router-dom';
import Landing from './views/Landing';
import Bitecast from './views/Bitecast';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
        <Link to="/" className="logo">
          <img src={logo} className="App-logo" alt="logo" />
        </Link>
        </header>
        <Route exact path="/" component={Landing} />
        <Route path="/api/bitecasts/:id" component={Bitecast} />
  {/*<Route path="/series/:id" component={Series} />*/}
      </div>
    </Router>
  );
}

export default App;
