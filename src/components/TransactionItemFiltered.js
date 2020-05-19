import React, { Component } from "react";

const TransactionItemFiltered = (props) => {
  const { transaction } = props;

  return (
    <div className="table-transaction-row">
      <div className="table-transaction-cell">{transaction.date}</div>
      <div className="table-transaction-cell">{transaction.category}</div>
      <div className="table-transaction-cell">{transaction.amount}</div>
      <div className="table-transaction-cell">{transaction.comment}</div>
    </div>
  );
};

export default TransactionItemFiltered;
