import React from "react";

function IncomeItem({ income }) {
  return (
    <div>
      <div className="">
        <h3>{income.title}</h3>
        <p>{income.amount}</p>
      </div>
    </div>
  );
}

export default IncomeItem;
