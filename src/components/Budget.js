import React, { useContext, useState } from "react";
import { BudgetContext } from "../contexts/BudgetContext";
// import BudgetContextProvider from "../contexts/BudgetContext";
// import BudgetCategory from "./BudgetCategory";
// import { Link } from "react-router-dom";
import Earnings from "./Earnings";
import Expenses from "./Expenses";
import Summary from "./Summary";

const Budget = () => {
  const {
    error,
    month,
    setMonth,
    saveMonth,
    hideBudgetButtons,
    showBudgetButtons,
    editForm,
    saveEditFormStatus,
    changeBudgetInputsToReadOnly,
  } = useContext(BudgetContext);

  const { editFormGlobal } = editForm;

  const { currentMonth } = month;

  const saveTemplate = () => {
    hideBudgetButtons();
    saveEditFormStatus(false);
    changeBudgetInputsToReadOnly();
  };

  const editTemplate = () => {
    showBudgetButtons();
    saveEditFormStatus(true);
  };

  return (
    <main className="container">
      <div className="container" className="content ">
        {/* <Link to="/transactions">Wydatki</Link> */}
        <h1>Mój budżet domowy</h1>
        <p className="budget-month">
          <span>miesiąc:</span>
          <select
            type="text"
            name="month"
            value={currentMonth}
            onChange={(event) => setMonth(event.target.value)}
            onBlur={() => saveMonth(month)}
          >
            wybierz miesiąc
            <option>wybierz miesiąc</option>
            <option>styczeń</option>
            <option>luty</option>
            <option>marzec</option>
            <option>kwiecień</option>
            <option>maj</option>
            <option>czerwiec</option>
            <option>lipiec</option>
            <option>sierpień</option>
            <option>wrzesień</option>
            <option>październik</option>
            <option>listopad</option>
            <option>grudzień</option>
          </select>
        </p>
        {editFormGlobal === true ? (
          <button onClick={saveTemplate}>Zapisz szablon</button>
        ) : (
          <button onClick={editTemplate}>Edytuj szablon</button>
        )}
        <Earnings />
        <p style={{ color: "red" }}>{error}</p>
        <Expenses />
        <p style={{ color: "red" }}>{error}</p>
        <Summary />
      </div>
    </main>
  );
};

export default Budget;
