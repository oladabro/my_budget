import React from "react";
import Budget from "./components/Budget";
// import TransactionsWraper from "./components/TransactionsWraper";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import NotFound from "./components/NotFound";
import Navigation from "./components/Navigation";
import Transactions from "./components/Transactions";
import BudgetContextProvider from "./contexts/BudgetContext";
import TransactionsContextProvider from "./contexts/TransactionsContext";

function App() {
  return (
    // <Router>
    //   <Navigation />
    //   <Switch>
    //     <Route exact path="/" component={Budget} />
    //     <Route path="/transactions" component={TransactionsWraper} />
    //     <Route component={NotFound} />
    //   </Switch>
    // </Router>

    <>
      <BudgetContextProvider>
        <TransactionsContextProvider>
          <Budget />
          <Transactions />
        </TransactionsContextProvider>
      </BudgetContextProvider>
    </>
  );
}

export default App;
