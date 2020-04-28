import React, { useContext } from "react";
import TransactionItem from "./TransactionItem";
import { TransactionsContext } from "../contexts/TransactionsContext";
import { BudgetContext } from "../contexts/BudgetContext";
import DOMAIN from "../contexts/BudgetContext";
import resolveResponse from "../contexts/BudgetContext";

const Transactions = () => {
  const {
    transactions,
    addTransaction,
    removeTransaction,
    updateTransaction,
    evaluateActuals,
  } = useContext(TransactionsContext);

  // const updateTransaction = ({ id, date, category, amount, comment }) => {
  //   console.log(id, date, category, amount, comment);

  //   // if (category && amount) {
  //   //   evaluateActuals()
  //   // }
  //   const requestOptions = {
  //     method: "PATCH",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       date,
  //       category,
  //       amount,
  //       comment,
  //     }),
  //   };

  //   console.log(requestOptions);
  //   fetch(`${DOMAIN}/transactions/${id}`, requestOptions)
  //     .then(resolveResponse)
  //     .catch((err) => console.warn(err));
  // };

  const { categoryList, earnings, expenses } = useContext(BudgetContext);
  console.log(transactions);

  const list = [
    ...earnings.map((category) => category.category),
    ...expenses.map((category) => category.category),
  ];

  return (
    <div>
      {/* <Link to="/">Budżet</Link> */}
      <h3>Bieżące wydatki miesiąca {transactions.length}</h3>

      {transactions.length ? (
        transactions.map((transaction) => (
          <TransactionItem
            transaction={transaction}
            key={transaction.id}
            updateTransaction={updateTransaction}
            removeTransaction={removeTransaction}
            categoryList={categoryList}
            evaluateActuals={evaluateActuals}
            // categoryList={list}
            // earnings={earnings}
            // expenses={expenses}
          />
        ))
      ) : (
        <p>Naciśnij + by dodać wydatki</p>
      )}
      <button onClick={() => addTransaction()}>Dodaj wydatki</button>
    </div>
  );
};

export default Transactions;
