import React from "react";
import { currencyFormatter } from "../lib/utils";

function ExpenseItem({ expense }) {
  return (
    <section className="flex items-center justify-between border py-2 px-4 bg-slate-500 rounded-3xl text-sm hover:border-emerald-500 text-slate-700">
      <div className="flex items-center capitalize justify-between gap-2">
        <div
          className="w-6 h-6 rounded-full"
          style={{ backgroundColor: expense.color }}
        />
        <h3>{expense.description}</h3>
        <small>{expense.createdAt}</small>
      </div>
      <p>{currencyFormatter(expense.amount)}</p>
    </section>
  );
}

export default ExpenseItem;
