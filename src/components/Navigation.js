import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <div>
      <ul>
        <li>
          <Link onClick={() => console.log("działam")} to="/">
            Budżet
          </Link>
        </li>
        <li>
          <Link to="/transactions">Wydatki</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navigation;
