import React from "react";
import Home from "./Home";
import Race from "./Race";
import Ending from "./Ending";
import { BrowserRouter, Switch, Route } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/race" component={Race} />
        <Route path="/end" component={Ending} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
