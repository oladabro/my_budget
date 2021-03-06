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

  const setAndsaveMonth = (month) => {
    setMonth(month);
    saveMonth(month);
  };

  return (
    <main className="container">
      <div className="container" className="content ">
        {/* <Link to="/transactions">Wydatki</Link> */}
        {/* <h1>Mój budżet domowy</h1> */}
        <p className="budget-month">
          <span>MIESIĄC:</span>
          <select
            type="text"
            name="month"
            value={currentMonth}
            // onChange={(event) => setMonth(event.target.value)}
            // onBlur={() => saveMonth(month)}
            onChange={(event) => setAndsaveMonth(event.target.value)}
          >
            wybierz miesiąc
            <option>wybierz...</option>
            <option>STYCZEŃ</option>
            <option>LUTY</option>
            <option>MARZEC</option>
            <option>KWIECIEŃ</option>
            <option>MAJ</option>
            <option>CZERWIEC</option>
            <option>LIPIEC</option>
            <option>SIERPIEŃ</option>
            <option>WRZESIEŃ</option>
            <option>PAŹDZIERNIK</option>
            <option>LISTOPAD</option>
            <option>GRUDZIEŃ</option>
          </select>
        </p>
        {editFormGlobal === true ? (
          <button className="editFormBtn" onClick={saveTemplate}>
            Zapisz szablon
          </button>
        ) : (
          <button className="editFormBtn" onClick={editTemplate}>
            Edytuj szablon
          </button>
        )}
        <Earnings />
        <p className="errorMsg" style={{ color: "red" }}>
          {error}
        </p>
        <Expenses />
        <p className="errorMsg" style={{ color: "red" }}>
          {error}
        </p>
        <Summary />
      </div>
    </main>
  );
};

export default Budget;
