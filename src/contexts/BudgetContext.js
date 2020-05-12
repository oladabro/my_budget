import React, { createContext, useState, useEffect } from "react";
import uuid from "uuid/v1";

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
  const [error, setError] = useState([]);
  const [month, setMonth] = useState({});
  const [editForm, setEditForm] = useState({});

  useEffect(() => {
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

    fetch(`${DOMAIN}/month`)
      .then(resolveResponse)
      .then((month) => {
        console.log(month);
        setMonth(month);
      })
      .catch((err) => console.log(err));

    fetch(`${DOMAIN}/editForm`)
      .then(resolveResponse)
      .then((status) => {
        console.log(status);
        setEditForm(status);
      })
      .catch((err) => console.log(err));
  }, []);

  const updateCategoryList = () => {
    setCategoryList(
      [
        ...earnings.map((category) => category.category),
        ...expenses.map((category) => category.category),
      ].sort()
    );
  };

  useEffect(() => {
    updateCategoryList();
  }, [earnings, expenses]);

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
        variance: "",
        id: uuid(),
        comment: "",
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
          const array = earnings.filter((category) => category.id !== id);
          setEarnings([...array]);
        })
        .catch((err) => console.warn(err));
    } else if (expenses.find((category) => category.id === id)) {
      fetch(`${DOMAIN}/expenses/${id}`, fetchOptions)
        .then(resolveResponse)
        .then(() => {
          setExpenses(expenses.filter((category) => category.id !== id));
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
        .then((resp) => {
          const array = [...earnings];
          let index = array.findIndex((el) => el.id === id);
          array[index] = resp;
          setEarnings([...array]);
          console.log(earnings, resp);
        })
        .catch((err) => console.warn(err));
    } else if (expenses.find((category) => category.id === id)) {
      fetch(`${DOMAIN}/expenses/${id}`, fetchOptions)
        .then(resolveResponse)
        .then((resp) => {
          const array = [...expenses];
          let index = array.findIndex((el) => el.id === id);
          array[index] = resp;
          setExpenses([...array]);
        })
        .catch((err) => console.warn(err));
    }
  };

  const hideBudgetButtons = () => {
    const budgetButtons = document.querySelectorAll(".budgetBtn");
    // console.log(budgetButtons);
    budgetButtons.forEach((btn) => {
      btn.classList.add("hide");
    });
  };

  const showBudgetButtons = () => {
    const budgetButtons = document.querySelectorAll(".budgetBtn");
    // console.log(budgetButtons);
    budgetButtons.forEach((btn) => {
      btn.classList.remove("hide");
    });
  };

  const validateIfBudgetCategoryIsDuplicated = (category) => {
    if (categoryList.includes(category) && category !== "") {
      const error = `kategoria "${category}" może wystąpić tylko raz`;
      setError([error]);
      console.log(category);
    }
  };

  const saveMonth = (month) => {
    console.log(month);
    const fetchOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        currentMonth: month,
      }),
    };

    fetch(`${DOMAIN}/month`, fetchOptions)
      .then(resolveResponse)
      .then((resp) => {
        setMonth(resp);
      })
      .catch((err) => console.warn(err));
  };

  const changeBudgetInputsToReadOnly = () => {
    const btns = document.querySelectorAll(".table-row-cell");
    console.log(btns);

    btns.forEach((btn) => {
      btn.readOnly = true;
    });
  };

  const saveEditFormStatus = (status) => {
    console.log(status);
    const fetchOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        editFormGlobal: status,
      }),
    };

    fetch(`${DOMAIN}/editForm`, fetchOptions)
      .then(resolveResponse)
      .then((resp) => {
        console.log(resp);
        setEditForm(resp);
      })
      .catch((err) => console.warn(err));
  };

  return (
    <BudgetContext.Provider
      value={{
        earnings,
        expenses,
        addBudgetCategory,
        removeBudgetCategory,
        updateBudgetCategory,
        setEarnings,
        setExpenses,
        categoryList,
        error,
        setError,
        validateIfBudgetCategoryIsDuplicated,
        month,
        setMonth,
        saveMonth,
        hideBudgetButtons,
        showBudgetButtons,
        editForm,
        setEditForm,
        saveEditFormStatus,
        changeBudgetInputsToReadOnly,
      }}
    >
      {props.children}
    </BudgetContext.Provider>
  );
};

export default BudgetContextProvider;
