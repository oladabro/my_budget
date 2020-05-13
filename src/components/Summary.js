import React, { useContext } from "react";
import { BudgetContext } from "../contexts/BudgetContext";

const Summary = () => {
  const { earnings, expenses } = useContext(BudgetContext);

  const handleMouseOver = (e) => {
    const id = e.target.id;
    const btn = document.getElementById(`tooltip${id}`);
    btn.classList.remove("hide");
  };

  const handleMouseLeave = (e) => {
    const id = e.target.id;
    const btn = document.getElementById(`tooltip${id}`);
    btn.classList.add("hide");
  };

  const totalPlannedEarnings = earnings
    .filter((el) => el.budget !== "")
    .reduce((prev, curr) => parseFloat(prev) + parseFloat(curr.budget), 0);

  const totalActualEarnings = earnings
    .filter((el) => el.actual !== 0)
    .reduce((prev, curr) => parseFloat(prev) + parseFloat(curr.actual), 0);

  const totalPlannedExpenses = expenses
    .filter((el) => el.budget !== "")
    .reduce((prev, curr) => parseFloat(prev) + parseFloat(curr.budget), 0);

  const totalActualExpenses = expenses
    .filter((el) => el.actual !== 0)
    .reduce((prev, curr) => parseFloat(prev) + parseFloat(curr.actual), 0);

  console.log(totalPlannedExpenses);
  return (
    <div className="table summary">
      <h3 className="table-name">Podsumowanie</h3>
      <div className="table-header summary">
        <input className="table-header-cell" value="Kategoria" readOnly />
        <input className="table-header-cell" value="Plan" readOnly />
        <input className="table-header-cell" value="Wykonanie" readOnly />
        <input className="table-header-cell" value="Różnica" readOnly />
      </div>
      <div className="table-row">
        <input value="Przychody łącznie" readOnly className="table-row-cell" />
        <input
          value={totalPlannedEarnings}
          readOnly
          className="table-row-cell"
        />
        <input
          value={totalActualEarnings}
          readOnly
          className="table-row-cell"
        />
        <input
          value={totalPlannedEarnings - totalActualEarnings}
          readOnly
          className="table-row-cell"
        />
      </div>

      <div className="table-row">
        <input value="Wydatki łącznie" readOnly className="table-row-cell" />
        <input
          value={totalPlannedExpenses}
          readOnly
          className="table-row-cell"
        />
        <input
          value={totalActualExpenses}
          readOnly
          className="table-row-cell"
        />
        <input
          value={totalPlannedExpenses - totalActualExpenses}
          className="table-row-cell"
          readOnly
        />
      </div>
      <div className="table-row tooltips">
        <input
          id="1"
          value="Do zaalokowania"
          onMouseOver={handleMouseOver}
          onMouseLeave={handleMouseLeave}
          readOnly
          className="table-row-cell"
        />
        <input
          value={totalPlannedEarnings + totalPlannedExpenses}
          readOnly
          className="table-row-cell"
        />
        <input readOnly className="table-row-cell empty" />
        <p id="tooltip1" className="tooltip hide">
          Różnica między przychodami a planowanymi wydatkami. Jeśli jest większa
          od zera to znaczy że jest potencjał by zaoszczędzić pieniądze. Wrzuć
          je w kategorię oszczędzanie. Jeśli jest mniejsza od zera oznacza to,
          że planujesz wydać więcej niż zarabiasz.
        </p>
      </div>
      <div className="table-row">
        <input
          id="2"
          value="Wynik miesiąca"
          onMouseOver={handleMouseOver}
          onMouseLeave={handleMouseLeave}
          readOnly
          className="table-row-cell"
        />
        {/* <input /> */}
        <input
          value={totalActualEarnings + totalActualExpenses}
          readOnly
          className="table-row-cell special"
        />
        <p id="tooltip2" className="tooltip hide">
          Różnica między aktualnymi przychodami a wydatkami danego miesiąca.
          Jeśli jest większa od zera to BRAWO! Oznacza to, że wydałeś mniej niż
          zarobiłeś. Jeśli jest mniejsza od zera to znaczy, że 'zjadłeś'
          oszczędności.
        </p>
      </div>
    </div>
  );
};

export default Summary;
