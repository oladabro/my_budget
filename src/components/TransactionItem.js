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
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { id, date, category, amount, comment } = this.state;
    const { categoryList } = this.props;

    const { updateTransaction, removeTransaction } = this.props;

    return (
      <div
        id={id}
        onBlur={() => updateTransaction(this.state)}
        className="table-transaction-row"
      >
        <button
          id={id}
          onClick={() => removeTransaction(id, category)}
          // className="delete-transaction"
          className="budgetBtn transaction"
        >
          <i className="far fa-trash-alt"></i>
        </button>
        <input
          id="date"
          type="date"
          name="date"
          value={date}
          onChange={this.handleOnChange}
          className="table-transaction-cell"
        />
        <select
          type="text"
          name="category"
          value={category}
          onChange={this.handleOnChange}
          className="table-transaction-cell"
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
          className="table-transaction-cell"
        />
        <textarea
          rows="1"
          type="text"
          name="comment"
          value={comment}
          onChange={this.handleOnChange}
          className="table-transaction-cell comment"
        />
      </div>
    );
  }
}

export default TransactionItem;
