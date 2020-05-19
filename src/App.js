import React, { useContext } from "react";
import AppWrapper from "./components/AppWrapper";
// import TransactionsWraper from "./components/TransactionsWraper";

// import Navigation from "./components/Navigation";
import Transactions from "./components/Transactions";
import BudgetContextProvider, { BudgetContext } from "./contexts/BudgetContext";
import TransactionsContextProvider from "./contexts/TransactionsContext";

const App = () => {
  return (
    <>
      <BudgetContextProvider>
        <TransactionsContextProvider>
          <AppWrapper />
        </TransactionsContextProvider>
      </BudgetContextProvider>
    </>
  );
};

export default App;
