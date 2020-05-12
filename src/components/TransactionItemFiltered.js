import React, { Component } from "react";

const TransactionItemFiltered = (props) => {
  const { transaction } = props;

  return (
    <div>
      <div>{transaction.date}</div>
      <div>{transaction.category}</div>
      <div>{transaction.amount}</div>
      <div>{transaction.comment}</div>
    </div>
  );
};

export default TransactionItemFiltered;
