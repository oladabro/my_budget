import React from "react";
import Transactions from "./Transactions";
import BudgetContextProvider from "../contexts/BudgetContext";
import TransactionsContextProvider from "../contexts/TransactionsContext";

const TransactionsWraper = () => {
  return (
    <TransactionsContextProvider>
      <BudgetContextProvider>
        <Transactions />
      </BudgetContextProvider>
    </TransactionsContextProvider>
  );
};

export default TransactionsWraper;
