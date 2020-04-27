import React, { useContext } from "react";
import { BudgetContext } from "../contexts/BudgetContext";
import BudgetCategory from "./BudgetCategory";

const Earnings = () => {
  const { earnings, addBudgetCategory } = useContext(BudgetContext);
  return (
    <div>
      <p>Aktualnie masz {earnings.length} kategorii przychodów w budżecie</p>
      <button id="addEarningsBtn" onClick={(event) => addBudgetCategory(event)}>
        +
      </button>
      {earnings.length ? (
        <div>
          {earnings.map((earning) => {
            return <BudgetCategory earning={earning} key={earning.id} />;
          })}
        </div>
      ) : (
        <p>Naciśnij + by dodać kategorie do budżetu</p>
      )}
    </div>
  );
};

export default Earnings;
