import React, { Component } from "react";
// import { TransactionsContext } from "../contexts/TransactionsContext";

// const TransactionItem = ({ props }) => {
//   // const { date, category, amount, comment, id } = transaction;
//   const { removeTransaction, updateTransaction } = useContext(
//     TransactionsContext
//   );
//   console.log(props);
//   const [transaction, setTransaction] = useState([props.transaction]);
//   // const [date, setDate] = useState([transaction]);
//   // const [id, set] = useState([transaction]);
//   // const [category, setCategory] = useState([transaction]);
//   // const [amount, setAmount] = useState([transaction]);
//   // const [comment, setComment] = useState([transaction]);

//   const handleClick = (e) => {
//     removeTransaction(e.target.id);
//   };

//   // handleChange = () => {
//   //   console.log("hi");
//   // };

//   return (
//     <div id={transaction.id} onBlur={() => updateTransaction(transaction.id)}>
//       <button id={transaction.id} onClick={handleClick}>
//         -
//       </button>
//       <input
//         type="date"
//         name="name"
//         value={transaction.date}
//         // onChange={() => setDate(transaction.date)}
//       />
//       <input type="text" name="category" value={transaction.category} />
//       <input type="number" name="amount" value={transaction.amount} />
//       <input type="text" name="comment" value={transaction.comment} />
//     </div>
//   );
// };

class TransactionItem extends Component {
  state = {
    id: this.props.transaction.id,
    date: this.props.transaction.date,
    category: this.props.transaction.category,
    amount: this.props.transaction.amount,
    comment: this.props.transaction.comment,
  };

  handleOnChange = (e) => {
    const { name, value } = e.target;
    const { category } = this.state;
    // if (value !== category && category == "") {
    //   console.log(
    //     `stary state ${this.state.category}, nowa kategoria: ${e.target.value}`
    //   );
    //   this.setState({
    //     [name]: value,
    //   });
    // } else if (value !== category && category !== "") {
    //   console.log("musze się przeliczyć");
    //   console.log(
    //     `stary state ${this.state.category}, nowa kategoria: ${e.target.value}`
    //   );

    //   this.props.updateActualForCategory(category, this.state.amount);

    //   this.setState({
    //     [name]: value,
    //   });
    //   console.log(this.props.transactions);
    //   // this.props.evaluateActuals(category, this.state.amount);
    // }

    this.setState({
      [name]: value,
    });
  };

  render() {
    const { id, date, category, amount, comment } = this.state;
    const { categoryList } = this.props;

    const {
      updateTransaction,
      removeTransaction,
      // evaluateActuals,
    } = this.props;

    // const fireActions = (id, category) => {
    //   removeTransaction(id, category);
    //   // evaluateActuals(category);
    // };

    return (
      <div id={id} onBlur={() => updateTransaction(this.state)}>
        <button id={id} onClick={() => removeTransaction(id, category)}>
          -
        </button>
        <input
          type="date"
          name="date"
          value={date}
          onChange={this.handleOnChange}
        />
        <select
          type="text"
          name="category"
          value={category}
          onChange={this.handleOnChange}
          // onFocus={this.handleClick}
        >
          <option>wybierz kategorie</option>
          {categoryList.map((category) => {
            if (category !== "") {
              return <option key={category}>{category}</option>;
            }
          })}
        </select>
        <input
          type="number"
          name="amount"
          value={amount}
          onChange={this.handleOnChange}
          // onBlur={() => evaluateActuals(category)}
        />
        <input
          type="text"
          name="comment"
          value={comment}
          onChange={this.handleOnChange}
        />
        {/* <button id={id} onClick={() => evaluateActuals(category)}>
          save
        </button> */}
      </div>
    );
  }
}

export default TransactionItem;
