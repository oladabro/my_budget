import React from "react";
// import { BudgetContext } from "../contexts/BudgetContext";
// import BudgetContextProvider from "../contexts/BudgetContext";
// import BudgetCategory from "./BudgetCategory";
// import { Link } from "react-router-dom";
import Earnings from "./Earnings";
import Expenses from "./Expenses";

const Budget = () => {
  // const { earnings, expenses } = useContext(BudgetContext);
  return (
    // <BudgetContextProvider>
    <div className="earnings">
      {/* <Link to="/transactions">Wydatki</Link> */}
      <h1>Mój budżet domowy</h1>
      <Earnings />
      <Expenses />
    </div>
    // </BudgetContextProvider>
  );
};

export default Budget;
