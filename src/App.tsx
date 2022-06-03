import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import ArrayList from "./pages/ArrayList";
import ArrayStats from "./pages/ArrayStats";
import ArrayDetail from "./pages/ArrayDetail";
import ArrayPost from "./pages/ArrayPost";

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/array-list" className="navbar-brand">
          Prueba Keo
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/array-stats"} className="nav-link">
              Stats
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/array-list"]} component={ArrayList} />
          <Route path="/array-detail/:id" component={ArrayDetail} />
          <Route path="/array-stats" component={ArrayStats} />
          <Route exact path="/array-post" component={ArrayPost} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
