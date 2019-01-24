import React from "react";
import Header from "./components/Header";
import Landing from "./components/Landing";
import Missing from "./components/Missing";
import Forecast from "./components/Forecast";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/forecast" component={Forecast} />
          <Route component={Missing} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

/* Todo:
1. Convert degrees to celsius and have a switch! units=metric || units=imperial
2. GraphJS
*/
