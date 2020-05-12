import React, { useContext, useState } from "react";
import TransactionItem from "./TransactionItem";
import { TransactionsContext } from "../contexts/TransactionsContext";
import { BudgetContext } from "../contexts/BudgetContext";
import TransactionItemFiltered from "./TransactionItemFiltered";

const Transactions = () => {
  const {
    transactions,
    addTransaction,
    removeTransaction,
    updateTransaction,
    updateActuals,
    evaluateActuals,
    updateActualForCategory,
    filterTransactions,
    evaluateActualsForTransactions,
  } = useContext(TransactionsContext);

  const { categoryList } = useContext(BudgetContext);
  const [category, setCategory] = useState("");

  const handleChange = (e) => {
    setCategory(e.target.value);
    filterTransactions(e.target.value);
  };

  const sumOfTransactions = transactions
    .filter((item) => item.amount !== "")
    .reduce((prev, curr) => parseFloat(prev) + parseFloat(curr.amount), 0);

  return (
    <div>
      {/* <Link to="/">Budżet</Link> */}
      <h3>Bieżące wydatki miesiąca {transactions.length}</h3>
      <h4>suma: {sumOfTransactions}</h4>
      {/* <button onClick={evaluateActualsForTransactions}>Zapisz</button> */}
      <button onClick={() => addTransaction()}>Dodaj wydatki</button>
      <input value="Data" readOnly />
      <select
        type="text"
        name="category"
        value={category}
        onChange={(e) => handleChange(e)}
        // onFocus={this.handleClick}
      >
        <option>Kategoria</option>
        {categoryList.map((category) => {
          if (category !== "") {
            return <option key={category}>{category}</option>;
          }
        })}
      </select>
      <input value="Kwota" readOnly />
      <input value="Dodatkowe informacje" readOnly />

      {
        (transactions.length && category == "") || category == "Kategoria" ? (
          transactions.map((transaction) => (
            <TransactionItem
              transaction={transaction}
              key={transaction.id}
              updateTransaction={updateTransaction}
              removeTransaction={removeTransaction}
              categoryList={categoryList}
              updateActuals={updateActuals}
              evaluateActuals={evaluateActuals}
              transactions={transactions}
              updateActualForCategory={updateActualForCategory}
            />
          ))
        ) : (
          <div>
            {transactions
              .filter((transaction) => transaction.category === category)
              .map((transaction) => (
                <TransactionItemFiltered
                  transaction={transaction}
                  key={transaction.id}
                />
              ))}
          </div>
        )
        // ) : (
        // //   <p>Naciśnij + by dodać wydatki</p>
      }
    </div>
  );
};

export default Transactions;
