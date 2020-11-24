import logo from './logo.svg';
import './App.css';
import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useHistory,
    useLocation
} from "react-router-dom";
import RootPage from "./pages/RootPage";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
      <div>
          <Router>
              <Switch>
                  <Route exact path="/">
                      <RootPage/>
                  </Route>
                  <Route path="/dashboard">
                      <Dashboard/>
                  </Route>
              </Switch>
          </Router>
      </div>
  );
}



export default App;
