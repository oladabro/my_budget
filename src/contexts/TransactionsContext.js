import React, { createContext, useState, useEffect, Component } from "react";
import BudgetContextProvider from "./BudgetContext";

export const TransactionsContext = createContext();

const DOMAIN = "http://localhost:3005";

const resolveResponse = (resp) => {
  if (resp.ok) {
    return resp.json();
  }
  throw new Error("błąd połaczenia");
};

const TransactionsContextProvider = (props) => {
  const [transactions, setTransations] = useState([]);
  const [earnings, setEarnings] = useState([]);
  const [expenses, setExpenses] = useState([]);

  //ładuje dane do state
  useEffect(() => {
    console.log("chce zaladowac dane z basy");
    fetch(`${DOMAIN}/transactions`)
      .then(resolveResponse)
      .then((transactions) => setTransations([...transactions]))
      .catch((err) => console.log(err));

    console.log(transactions);

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

  useEffect(() => {
    console.log("co mam zrobić");
  }, [transactions]);

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
    console.log("dodaje item do bazy", transactions);
    fetch(`${DOMAIN}/transactions`, requestOptions)
      .then(resolveResponse)
      .then((transaction) => {
        setTransations((prevState) => [...prevState, transaction]);
      })
      .catch((err) => console.warn(err));
  };

  const removeTransaction = (id) => {
    console.log(id);
    fetch(`${DOMAIN}/transactions/${id}`, {
      method: "DELETE",
    })
      .then(resolveResponse)
      .then(() => {
        setTransations(
          transactions.filter((transaction) => transaction.id != id)
        );
      })
      .catch((err) => console.warn(err));
  };

  const updateTransaction = ({ id, date, category, amount, comment }) => {
    console.log(id, date, category, amount, comment);

    if (amount) {
      evaluateActuals(category);
    }
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

    console.log(requestOptions);
    fetch(`${DOMAIN}/transactions/${id}`, requestOptions)
      .then(resolveResponse)
      .catch((err) => console.warn(err));
  };

  const evaluateActuals = (category) => {
    console.log("zaraz się przeliczę", category, earnings);

    const arrayForCategory = transactions.filter(
      (transaction) => transaction.category == category
    );
    const actualForCategory = arrayForCategory.reduce(
      (prev, curr) => parseFloat(prev) + parseFloat(curr.amount),
      0
    );
    const searchedItem = earnings.find(
      (earning) => earning.category === category
    );
    searchedItem.actual = actualForCategory;
    console.log(searchedItem);
  };

  // calculateActuals = () => {
  //   const { earningsCategory } = this.state;
  //   const { transactions } = this.props;

  //   if (transactions.length) {
  //     const { transactions } = this.props;

  //     earningsCategory.forEach((element) => {
  //       const name = element.name;
  //       console.log(name);
  //       const array = transactions.filter(
  //         (transaction) => transaction.category == name
  //       );
  //       console.log(array);
  //       const actual = array.reduce(
  //         (prev, curr) => parseFloat(prev) + parseFloat(curr.amount),
  //         0
  //       );
  //       const searchedItem = earningsCategory.find(
  //         (category) => category.name === name
  //       );
  //       searchedItem.actual = actual;
  //       console.log(earningsCategory);
  //       console.log(searchedItem.id);
  //     });
  //     this.props.updateState();
  //     this.patchData();

  //     console.log("moj state", this.state.earningsCategory);
  //   }
  // };

  // patchData = () => {
  //   const earningsCategory = this.state.earningsCategory;

  //   earningsCategory.forEach((element) => {
  //     const id = element.id;
  //     const actual = element.actual;

  //     const requestOptions = {
  //       method: "PATCH",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         actual,
  //       }),
  //     };

  //     fetch(`${DOMAIN}/earningsCategory/${id}`, requestOptions)
  //       .then(resolveResponse)
  //       .then(() =>
  //         this.setState((prevState) => ({
  //           earningsCategory: prevState.earningsCategory,
  //         }))
  //       );
  //   });
  // };

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        addTransaction,
        removeTransaction,
        updateTransaction,
      }}
    >
      {props.children}
    </TransactionsContext.Provider>
  );
};

// class TransactionsContextProvider extends Component {
//   state = {
//     transactions: [],
//   };

//   componentDidMount() {
//     fetch(`${DOMAIN}/transactions`)
//       .then(resolveResponse)
//       .then((transactions) => {
//         this.setState({
//           transactions: [...transactions],
//         });
//       })
//       .catch((err) => console.log(err));
//   }

//   addTransaction = () => {
//     const requestOptions = {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         date: "",
//         category: "",
//         amount: "",
//         comment: "",
//       }),
//     };

//     fetch(`${DOMAIN}/transactions`, requestOptions)
//       .then(resolveResponse)
//       .then((transaction) =>
//         this.setState((prevState) => ({
//           transactions: [...prevState.transactions, transaction],
//         }))
//       )

//       .catch((err) => console.warn(err));
//   };

//   removeTransaction = (id) => {
//     console.log(id);
//     fetch(`${DOMAIN}/transactions/${id}`, {
//       method: "DELETE",
//     })
//       .then(resolveResponse)
//       .then(() => {
//         const transactions = this.state.transactions.filter(
//           (transaction) => transaction.id != id
//         );
//         this.setState({
//           transactions,
//         });
//       })
//       .catch((err) => console.warn(err));
//   };

//   render() {
//     const { transactions } = this.state;
//     const addTransaction = this.addTransaction;
//     const removeTransaction = this.removeTransaction;
//     return (
//       <TransactionsContext.Provider
//         value={{ transactions, addTransaction, removeTransaction }}
//       >
//         {this.props.children}
//       </TransactionsContext.Provider>
//     );
//   }
// }

export default TransactionsContextProvider;
