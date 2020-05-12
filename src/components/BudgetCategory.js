import React, { useContext, useState } from "react";
import { BudgetContext } from "../contexts/BudgetContext";
// import { TransactionsContext } from "../contexts/TransactionsContext";

const BudgetCategory = ({ earning }) => {
  const { actual, id } = earning;

  const {
    removeBudgetCategory,
    updateBudgetCategory,
    validateIfBudgetCategoryIsDuplicated,
    setError,
    editForm,
  } = useContext(BudgetContext);

  const { editFormGlobal } = editForm;

  const [category, setCategory] = useState(earning.category);
  const [budget, setBudget] = useState(earning.budget);
  const [comment, setComment] = useState(earning.comment);

  const fire = (event) => {
    const category = event.target.value;
    changeInput(event);
    validateIfBudgetCategoryIsDuplicated(category);
  };

  const changeInput = (event) => {
    setCategory(event.target.value);
    setError([]);
  };

  return (
    <div className="table-row">
      {/* <div className="category-btn"></div> */}
      {/* <div className="row-content"> */}
      <button
        id={id}
        className={editFormGlobal === true ? "budgetBtn" : "budgetBtn hide"}
        onClick={() => removeBudgetCategory(id)}
      >
        usuń
      </button>
      <input
        id={id}
        type="text"
        name="category"
        value={category}
        onChange={(event) => fire(event)}
        onBlur={(event) => updateBudgetCategory(id, event)}
        className="table-row-cell"
        readOnly={editFormGlobal === true ? false : true}
      />
      <input
        type="number"
        name="budget"
        value={budget}
        onChange={(event) => setBudget(event.target.value)}
        onBlur={(event) => updateBudgetCategory(id, event)}
        className="table-row-cell"
        readOnly={editFormGlobal === true ? false : true}
      />
      <input value={actual} readOnly className="table-row-cell" />
      <input value={budget - actual} readOnly className="table-row-cell" />
      {/* <input
        type="text"
        name="comment"
        value={comment}
        onChange={(event) => setComment(event.target.value)}
        onBlur={(event) => updateBudgetCategory(id, event)}
        className="table-row-cell comment"
        readOnly={editFormGlobal === true ? false : true}
      /> */}
      <textarea
        type="text"
        name="comment"
        value={comment}
        onChange={(event) => setComment(event.target.value)}
        onBlur={(event) => updateBudgetCategory(id, event)}
        className="table-row-cell comment"
        readOnly={editFormGlobal === true ? false : true}
        rows="1"
        cols="1"
        wrap="soft"
      />
      {/* </div> */}
    </div>
  );
};

export default BudgetCategory;
