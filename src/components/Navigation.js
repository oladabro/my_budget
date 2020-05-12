import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { TransactionsContext } from "../contexts/TransactionsContext";

const Navigation = () => {
  const { evaluateActualsForTransactions } = useContext(TransactionsContext);

  return (
    <nav>
      <div className="nav-bar container">
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
