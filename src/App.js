import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from "react-router-dom";
import { Container, Row, Col } from 'reactstrap';

import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Saved from './components/Saved';
import Search from './components/Search';

function App() {
  return (
    <Container >
      <Router>
        <div>
          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Header />
          <Switch>
            <Route path="/search">
              <Search />
            </Route>
            <Route path="/saved">
              <Saved />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    </Container>
  );
}

export default App;
