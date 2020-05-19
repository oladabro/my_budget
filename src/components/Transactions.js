import React, { useContext, useState, useEffect } from "react";
import TransactionItem from "./TransactionItem";
import { TransactionsContext } from "../contexts/TransactionsContext";
import { BudgetContext } from "../contexts/BudgetContext";
import TransactionItemFiltered from "./TransactionItemFiltered";

const Transactions = () => {
  const {
    transactions,
    setTransactions,
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
  const [category, setCategory] = useState("Kategoria");

  const handleChange = (e) => {
    setCategory(e.target.value);
    filterTransactions(e.target.value);
    calcSumOfTransactions(e.target.value);
    calcNumberOfTransactions(e.target.value);
  };
  const calcNumberOfTransactions = (category) => {
    let numOfTransaction = transactions.length;
    if (category !== "Kategoria") {
      numOfTransaction = transactions.filter(
        (item) => item.category == category
      ).length;
    }
    return (
      <h3 className="transaction-title">
        Bieżące transakcje miesiąca: {numOfTransaction}
      </h3>
    );
  };
  const calcSumOfTransactions = (category) => {
    console.log("chce zmienić sume");
    let sumOfTransactions = 0;
    if (category == "Kategoria") {
      sumOfTransactions = transactions
        .filter((item) => item.amount !== "")
        .reduce((prev, curr) => parseFloat(prev) + parseFloat(curr.amount), 0);
    } else {
      sumOfTransactions = transactions
        .filter((item) => item.category == category)
        .reduce((prev, curr) => parseFloat(prev) + parseFloat(curr.amount), 0);
    }
    return <h4 className="transaction-subtitle">suma: {sumOfTransactions}</h4>;
  };
  return (
    <>
      <header>
        <div className="freeze-table-header container">
          {/* <h3 className="transaction-title">
            Bieżące transakcje miesiąca: {transactions.length}
          </h3> */}
          {calcNumberOfTransactions(category)}
          {calcSumOfTransactions(category)}
          <button className="addTransaction" onClick={() => addTransaction()}>
            Dodaj wydatki
          </button>
        </div>
      </header>
      <main className="container transactions">
        <div className="table-transactions-header">
          <input value="Data" readOnly />
          <select
            type="text"
            name="category"
            value={category}
            onChange={(e) => handleChange(e)}
          >
            <option>Kategoria</option>
            {categoryList.map((category) => {
              if (category !== "") {
                return <option key={category}>{category} </option>;
              }
            })}
          </select>
          <input value="Kwota" readOnly />
          <input value="Dodatkowe informacje" readOnly />
        </div>
        {/* </div> */}
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
      </main>
    </>
  );
};

export default Transactions;
