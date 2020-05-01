import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css'
import Cards from './components/total'
import Nav from './components/Nav'
import Countries from './components/country-list'
import Geo from './components/Geo'


export default function App() {
  return (
  


    <Router>
      
      <div>
        <ul>
          <li>
            <Link to="/">Overral Summary</Link>
          </li>
       
          <li>
            <Link to="/Countries">Countries</Link>
          </li>
          <li style={{    margin: 'auto 48% auto auto'}}>
          <Geo />          
          </li>
  
       
        </ul>
        <Nav/>

        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
       
          <Route path="/Countries">
            <Countries />
          </Route>
         
        </Switch>
      </div>
      
    </Router>
    
  );
}

function Home() {
  return (
    <div>
      <h2 style={{textAlign:'center' ,    marginTop: '-20px'}}>Overral Summary</h2>
      
      <Cards />
    </div>
  );
}

