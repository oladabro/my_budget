import React, { useContext, useState } from "react";
import { BudgetContext } from "../contexts/BudgetContext";

const BudgetCategory = ({ earning }) => {
  const { actual, id } = earning;

  const { removeBudgetCategory, updateBudgetCategory } = useContext(
    BudgetContext
  );

  const [category, setCategory] = useState(earning.category);
  const [budget, setBudget] = useState(earning.budget);

  return (
    <div>
      <button id={id} onClick={() => removeBudgetCategory(id)}>
        -
      </button>
      <input
        id={id}
        type="text"
        name="category"
        value={category}
        onChange={(event) => setCategory(event.target.value)}
        onBlur={(event) => updateBudgetCategory(id, event)}
      />
      <input
        type="number"
        name="budget"
        value={budget}
        onChange={(event) => setBudget(event.target.value)}
        onBlur={(event) => updateBudgetCategory(id, event)}
      />
      <span>{actual}</span>
    </div>
  );
};

export default BudgetCategory;
