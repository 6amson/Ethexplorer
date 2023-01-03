import React from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Landingpage from "./components/Landingpage";
import Resultpage from './components/Resultpage'
import Blockpage from "./components/Blockpage";

import Test from "./components/Test"





function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path='/'>
            <Landingpage />
          </Route>
          <Route path='/test'>
            <Test />
          </Route>
          <Route path='/result'>
            <Resultpage />
          </Route>
          <Route path='/blockresult'>
            <Blockpage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
