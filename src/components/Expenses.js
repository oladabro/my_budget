import React, { useContext } from "react";
import { BudgetContext } from "../contexts/BudgetContext";
import BudgetCategory from "./BudgetCategory";

const Expenses = () => {
  const { expenses, addBudgetCategory, editForm } = useContext(BudgetContext);
  const { editFormGlobal } = editForm;
  return (
    <div className="table expenses">
      <h3 className="table-name">Wydatki</h3>
      <div className="table-btn expenses">
        {editFormGlobal === true && (
          <button
            id="addExpensesBtn"
            onClick={(event) => addBudgetCategory(event)}
          >
            +
          </button>
        )}
      </div>
      <div className="table-header expenses">
        <input className="table-header-cell" value="Kategoria" readOnly />
        <input className="table-header-cell" value="Plan" readOnly />
        <input className="table-header-cell" value="Wykonanie" readOnly />
        <input className="table-header-cell" value="Różnica" readOnly />
        <input
          className="table-header-cell"
          value="Dodatkowe informacje"
          readOnly
        />
      </div>
      {expenses.length ? (
        <>
          {expenses.map((expense) => {
            return <BudgetCategory earning={expense} key={expense.id} />;
          })}
        </>
      ) : (
        <p>Naciśnij + by dodać kategorie do budżetu</p>
      )}
    </div>
  );
};

export default Expenses;
