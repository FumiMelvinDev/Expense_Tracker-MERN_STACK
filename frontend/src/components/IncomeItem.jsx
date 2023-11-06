import React from "react";
import { currencyFormatter } from "../lib/utils";

function IncomeItem({ income }) {
  return (
    <section className="flex items-center justify-between border py-2 px-4 my-2 bg-slate-700 text-slate-100 rounded-3xl text-sm hover:border-emerald-500 hover:cursor-pointer">
      <div className="flex items-center capitalize justify-between gap-2">
        <h3>{income.title}</h3>
        <small className="text-xs">
          {new Date(income.createdAt).toLocaleDateString("en-za")}
        </small>
      </div>
      <p>{currencyFormatter(income.amount)}</p>
    </section>
  );
}

export default IncomeItem;
