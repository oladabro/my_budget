import React, { createContext, useState, useEffect } from "react";
import uuid from "uuid/v1";
import { render } from "@testing-library/react";

export const BudgetContext = createContext();

const DOMAIN = "http://localhost:3005";

const resolveResponse = (resp) => {
  if (resp.ok) {
    return resp.json();
  }
  throw new Error("błąd połaczenia");
};

const BudgetContextProvider = (props) => {
  const [earnings, setEarnings] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    console.log("chce zaladowac dane z basy");
    fetch(`${DOMAIN}/earnings`)
      .then(resolveResponse)
      .then((earnings) => {
        setEarnings([...earnings]);
      })
      .catch((err) => console.log(err));

    fetch(`${DOMAIN}/expenses`)
      .then(resolveResponse)
      .then((expenses) => {
        setExpenses([...expenses]);
      })
      .catch((err) => console.log(err));
  }, []);

  const updateCategoryList = () => {
    console.log(categoryList, earnings);
  };

  useEffect(() => {
    console.log("zmienił się state", categoryList);
    setCategoryList([
      ...earnings.map((category) => category.category),
      ...expenses.map((category) => category.category),
    ]);
  }, [earnings]);

  const addBudgetCategory = (event) => {
    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        category: "",
        budget: "",
        actual: 0,
        variance: 0,
        id: uuid(),
      }),
    };

    if (event.target.id === "addEarningsBtn") {
      fetch(`${DOMAIN}/earnings`, fetchOptions)
        .then(resolveResponse)
        .then((category) => {
          setEarnings([...earnings, category]);
        })
        .catch((err) => console.warn(err));
    } else if (event.target.id === "addExpensesBtn") {
      fetch(`${DOMAIN}/expenses`, fetchOptions)
        .then(resolveResponse)
        .then((category) => {
          setExpenses([...expenses, category]);
        })
        .catch((err) => console.warn(err));
    }
  };

  const removeBudgetCategory = (id) => {
    const fetchOptions = {
      method: "DELETE",
    };
    if (earnings.find((category) => category.id === id)) {
      fetch(`${DOMAIN}/earnings/${id}`, fetchOptions)
        .then(resolveResponse)
        .then(() => {
          setEarnings(earnings.filter((category) => category.id != id));
        })
        .catch((err) => console.warn(err));
    } else if (expenses.find((category) => category.id === id)) {
      fetch(`${DOMAIN}/expenses/${id}`, fetchOptions)
        .then(resolveResponse)
        .then(() => {
          setExpenses(expenses.filter((category) => category.id != id));
        })
        .catch((err) => console.warn(err));
    }
  };

  const updateBudgetCategory = (id, event) => {
    const { name, value } = event.target;

    const fetchOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        [name]: value,
      }),
    };

    if (earnings.find((category) => category.id === id)) {
      fetch(`${DOMAIN}/earnings/${id}`, fetchOptions)
        .then(resolveResponse)
        // .then((resp) => {
        //   const index = earnings.length;
        //   earnings[index] = resp;
        //   console.log(earnings);

        //   // console.log(earnings[index]);
        //   setEarnings([...earnings]);
        //   // setEarnings((prevState) => [...prevState]);
        // })
        .catch((err) => console.warn(err));
    } else if (expenses.find((category) => category.id === id)) {
      fetch(`${DOMAIN}/expenses/${id}`, fetchOptions)
        .then(resolveResponse)
        .then(() => {
          setExpenses((prevState) => [...prevState]);
        })
        .catch((err) => console.warn(err));
    }

    fetch(`${DOMAIN}/earnings`)
      .then(resolveResponse)
      .then((earnings) => {
        setEarnings([...earnings]);
      })
      .catch((err) => console.log(err));

    fetch(`${DOMAIN}/expenses`)
      .then(resolveResponse)
      .then((expenses) => {
        setExpenses([...expenses]);
      })
      .catch((err) => console.log(err));
  };

  return (
    <BudgetContext.Provider
      value={{
        earnings,
        expenses,
        addBudgetCategory,
        removeBudgetCategory,
        updateBudgetCategory,
        categoryList,
      }}
    >
      {props.children}
    </BudgetContext.Provider>
  );
};

export default BudgetContextProvider;
