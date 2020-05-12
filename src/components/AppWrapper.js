import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import NotFound from "./NotFound";
import Transactions from "./Transactions";
import Budget from "./Budget";
import Navigation from "./Navigation";

const AppWrapper = () => {
  return (
    <>
      <Router>
        <Navigation />
        <Switch>
          <Route exact path="/" component={Budget} />
          <Route path="/Transactions" component={Transactions} />
          <Route component={NotFound} />
        </Switch>
      </Router>
      {/* <Budget />
      <Transactions /> */}
    </>
  );
};

export default AppWrapper;
