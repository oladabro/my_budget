import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { TransactionsContext } from "../contexts/TransactionsContext";

const Navigation = () => {
  const { evaluateActualsForTransactions } = useContext(TransactionsContext);

  return (
    <nav>
      <div className="nav-bar container">
        <div className="logo">MÓJ BUDŻET DOMOWY</div>
        <ul>
          <li>
            <Link onClick={evaluateActualsForTransactions} to="/">
              BUDŻET
            </Link>
          </li>
          <li>
            <Link to="/transactions">WYDATKI</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
