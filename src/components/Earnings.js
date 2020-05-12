import React, { useContext } from "react";
import { BudgetContext } from "../contexts/BudgetContext";
import BudgetCategory from "./BudgetCategory";

const Earnings = () => {
  const { earnings, addBudgetCategory, error, editForm } = useContext(
    BudgetContext
  );
  const { editFormGlobal } = editForm;
  return (
    <div className="table earnings">
      <h3 className="table-name">Przychody</h3>
      <div className="table-btn earnings">
        {editFormGlobal === true && (
          <button
            id="addEarningsBtn"
            onClick={(event) => addBudgetCategory(event)}
          >
            +
          </button>
        )}
      </div>
      <div className="table-header earnings">
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
      {earnings.length ? (
        <>
          {earnings.map((earning) => {
            return <BudgetCategory earning={earning} key={earning.id} />;
          })}
        </>
      ) : (
        <p>Naciśnij + by dodać kategorie do budżetu</p>
      )}
    </div>
  );
};

export default Earnings;
