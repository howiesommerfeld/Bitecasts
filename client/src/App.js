import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Link, Switch, Route } from 'react-router-dom';
import Landing from './views/Landing';
import Bitecast from './views/Bitecast';


function App() {
  return (

    <div className="App">
      <header className="App-header">
        <Link to="/" className="logo">
          <img src={logo} className="App-logo" alt="logo" />
        </Link>
      </header>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/bitecasts/:id" component={Bitecast} />    
      </Switch>
      <footer >
        <div className="bitecast app-link">                
            <a href="https://play.google.com/store/apps/details?id=com.speakk" target="_blank" rel="noopener noreferrer">Download The Bitecast App Here</a>
        </div>
      </footer>
    </div>
    );
}

export default App;
