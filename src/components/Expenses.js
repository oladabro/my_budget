import React, { useContext } from "react";
import { BudgetContext } from "../contexts/BudgetContext";
import BudgetCategory from "./BudgetCategory";

const Expenses = () => {
  const { expenses, addBudgetCategory } = useContext(BudgetContext);
  return (
    <div>
      <p>Aktualnie masz {expenses.length} kategorii wydatkow w budżecie</p>
      <button id="addExpensesBtn" onClick={(event) => addBudgetCategory(event)}>
        +
      </button>
      {expenses.length ? (
        <div>
          {expenses.map((expense) => {
            return <BudgetCategory earning={expense} key={expense.id} />;
          })}
        </div>
      ) : (
        <p>Naciśnij + by dodać kategorie do budżetu</p>
      )}
    </div>
  );
};

export default Expenses;
