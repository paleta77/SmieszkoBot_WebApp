import './App.css';
import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,

} from "react-router-dom";
import RootPage from "./pages/RootPage";
import Dashboard from "./pages/Dashboard";
import {ProvideAuth, PrivateRoute} from "./use-auth";

function App() {
  return (
      <ProvideAuth>
          <Router>
              <Switch>
                  <Route exact path="/">
                      <RootPage/>
                  </Route>
                  <PrivateRoute path="/dashboard">
                      <Dashboard/>
                  </PrivateRoute>
              </Switch>
          </Router>
      </ProvideAuth>
  );
}



export default App;
