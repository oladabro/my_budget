import React, {
  createContext,
  useState,
  useEffect,
  Component,
  useContext,
} from "react";
import BudgetContextProvider, { BudgetContext } from "./BudgetContext";

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

  const { earnings } = useContext(BudgetContext);

  //ładuje dane do state
  useEffect(() => {
    console.log("chce zaladowac dane z basy");
    fetch(`${DOMAIN}/transactions`)
      .then(resolveResponse)
      .then((transactions) => setTransactions([...transactions]))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    console.log("useEffect runs", transactions);
  }, [transactions]);

  // useEffect(() => {
  //   console.log("co mam zrobić");
  // }, [transactions]);

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
  const removeTransaction = (id) => {
    console.log(id);
    fetch(`${DOMAIN}/transactions/${id}`, {
      method: "DELETE",
    })
      .then(resolveResponse)
      .then(() => {
        setTransactions(
          transactions.filter((transaction) => transaction.id != id)
        );
      })
      .catch((err) => console.warn(err));
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

    console.log(requestOptions);
    fetch(`${DOMAIN}/transactions/${id}`, requestOptions)
      .then(resolveResponse)
      // .then((resp) => {
      //   const array = [...transactions];

      //   let index = array.find((el) => el.id == id);
      //   index = resp;
      //   console.log(index);

      //   setTransactions([...array]);
      //   console.log(transactions);
      // })
      .catch((err) => console.warn(err));

    fetch(`${DOMAIN}/transactions`)
      .then(resolveResponse)
      .then((transactions) => {
        setTransactions([...transactions]);
      })
      .catch((err) => console.log(err));

    // if (amount) {
    //   console.log("chce się przeliczyć");
    //   evaluateActuals(category);
    // }
  };
  console.log(transactions);

  const evaluateActuals = (category) => {
    fetch(`${DOMAIN}/transactions`)
      .then(resolveResponse)
      .then((transactions) => {
        setTransactions([...transactions]);
      })
      .catch((err) => console.log(err));

    console.log(transactions);
    const arrayForCategory = transactions.filter(
      (transaction) => transaction.category == category
    );

    console.log(arrayForCategory);
    const actualForCategory = arrayForCategory.reduce(
      (prev, curr) => parseFloat(prev) + parseFloat(curr.amount),
      0
    );
    console.log(actualForCategory);
    // const searchedItem = earnings.find(
    //   (earning) => earning.category === category
    // );

    console.log(transactions);
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
        evaluateActuals,
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
