import React, { createContext, useState, useEffect, useContext } from "react";
import BudgetContextProvider, { BudgetContext } from "./BudgetContext";
import evaluateActuals from "../components/Transactions";

export const TransactionsContext = createContext();

const DOMAIN = "http://localhost:3005";

const resolveResponse = (resp) => {
  if (resp.ok) {
    return resp.json();
  }
  throw new Error("błąd połaczenia");
};

const TransactionsContextProvider = (props) => {
  const [transactions, setTransactions] = useState([]);

  const {
    earnings,
    expenses,
    setEarnings,
    setExpenses,
    categoryList,
  } = useContext(BudgetContext);

  //ładuje dane do state
  useEffect(() => {
    fetch(`${DOMAIN}/transactions`)
      .then(resolveResponse)
      .then((transactions) => setTransactions([...transactions]))
      .catch((err) => console.log(err));
  }, []);

  // useEffect(evaluateActualsForTransactions(), [transactions]);

  //dodaje nową pustą transakcje do tablicy
  const addTransaction = () => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        date: "",
        category: "",
        amount: "",
        comment: "",
      }),
    };

    fetch(`${DOMAIN}/transactions`, requestOptions)
      .then(resolveResponse)
      .then((transaction) => {
        setTransactions((prevState) => [...prevState, transaction]);
      })
      .catch((err) => console.warn(err));
  };

  //usuwam transaction z tablicy
  const removeTransaction = (id, category) => {
    console.log(id);
    fetch(`${DOMAIN}/transactions/${id}`, {
      method: "DELETE",
    })
      .then(resolveResponse)
      .then(() => {
        // const array = [...transactions];
        const array = transactions.filter(
          (transaction) => transaction.id != id
        );
        console.log(array);
        evaluateActuals(array, category);
        setTransactions([...array]);
      })
      .catch((err) => console.warn(err));

    // evaluateActuals(category);
  };

  //uaktualniam dane w tablicy
  const updateTransaction = ({ id, date, category, amount, comment }) => {
    console.log(id, date, category, amount, comment);

    const requestOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        date,
        category,
        amount,
        comment,
      }),
    };

    fetch(`${DOMAIN}/transactions/${id}`, requestOptions)
      .then(resolveResponse)
      .then((resp) => {
        const array = [...transactions];

        let index = array.findIndex((el) => el.id === id);
        array[index] = resp;

        setTransactions([...array]);

        // const arrayForCategory = array.filter(
        //   (transaction) => transaction.category === category
        // );
        // const arrayForCategoryWithAmounts = arrayForCategory.filter(
        //   (el) => el.amount !== ""
        // );
        // console.log(arrayForCategory);
        // const actualForCategory = arrayForCategoryWithAmounts.reduce(
        //   (prev, curr) => parseFloat(prev) + parseFloat(curr.amount),
        //   0
        // );
        // console.log(actualForCategory);
        // updateActuals(category, actualForCategory);
      })
      .catch((err) => console.warn(err));
  };

  const updateActuals = (category, data) => {
    const requestOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        actual: data,
      }),
    };

    if (earnings.find((el) => el.category === category)) {
      const array = [...earnings];
      console.log(array);
      const categoryWithNewActualsIndex = array.findIndex(
        (el) => el.category === category
      );
      array[categoryWithNewActualsIndex].actual = data;
      setEarnings([...array]);
      const categoryId = earnings.find((el) => el.category === category).id;
      fetch(`${DOMAIN}/earnings/${categoryId}`, requestOptions)
        .then(resolveResponse)
        .then((resp) => console.log(resp))
        .catch((err) => console.warn(err));
    }

    if (expenses.find((el) => el.category === category)) {
      const array = [...expenses];
      const categoryWithNewActualsIndex = array.findIndex(
        (el) => el.category === category
      );
      array[categoryWithNewActualsIndex].actual = data;
      setExpenses([...array]);
      const categoryId = expenses.find((el) => el.category === category).id;
      fetch(`${DOMAIN}/expenses/${categoryId}`, requestOptions)
        .then(resolveResponse)
        .then((resp) => console.log(resp))
        .catch((err) => console.warn(err));
    }
  };

  // const updateActualForCategory = (category, data) => {
  //   const arrayForCategory = transactions.filter(
  //     (item) => item.category === category
  //   );

  //   const arrayForCategoryWithAmounts = arrayForCategory.filter(
  //     (el) => el.amount !== ""
  //   );

  //   const actualForCategory =
  //     arrayForCategoryWithAmounts.reduce(
  //       (prev, curr) => parseFloat(prev) + parseFloat(curr.amount),
  //       0
  //     ) - data;

  //   updateActuals(category, actualForCategory);

  //   console.log(arrayForCategory, data);
  // };

  const evaluateActualsForTransactions = () => {
    console.log(categoryList);

    categoryList.forEach((category) => {
      const arrayForCategory = transactions.filter(
        (transaction) => transaction.category === category
      );
      const arrayForCategoryWithAmounts = arrayForCategory.filter(
        (el) => el.amount !== ""
      );
      const actualForCategory = arrayForCategoryWithAmounts.reduce(
        (prev, curr) => parseFloat(prev) + parseFloat(curr.amount),
        0
      );
      updateActuals(category, actualForCategory);
    });
  };

  const filterTransactions = (category) => {
    transactions.map((transaction) => {
      return (
        <>
          <input readOnly>{transaction.date}</input>
          <input readOnly>{transaction.category}</input>;
        </>
      );
    });
  };

  const evaluateActuals = (array, category) => {
    console.log(category);

    const arrayForCategory = array.filter(
      (transaction) => transaction.category === category
    );
    const arrayForCategoryWithAmounts = arrayForCategory.filter(
      (el) => el.amount !== ""
    );
    console.log(arrayForCategory);
    const actualForCategory = arrayForCategoryWithAmounts.reduce(
      (prev, curr) => parseFloat(prev) + parseFloat(curr.amount),
      0
    );
    console.log(actualForCategory);
    updateActuals(category, actualForCategory);
  };

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        addTransaction,
        removeTransaction,
        updateTransaction,
        evaluateActuals,
        updateActuals,
        // updateActualForCategory,
        evaluateActualsForTransactions,
        filterTransactions,
      }}
    >
      {props.children}
    </TransactionsContext.Provider>
  );
};

export default TransactionsContextProvider;
