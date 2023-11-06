import React from "react";
import { currencyFormatter } from "../lib/utils";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { deleteExpense } from "../features/expenses/expenseSlice";

function ExpenseItem({ expense }) {
  const dispatch = useDispatch();

  return (
    <section className="flex items-center justify-between border py-2 px-4 my-2 bg-slate-300 rounded-3xl text-sm hover:border-emerald-500 text-slate-700 hover:cursor-pointer">
      <div className="flex items-center capitalize justify-between gap-2">
        <div
          className="w-6 h-6 rounded-full"
          style={{ backgroundColor: expense.color }}
        />
        <h3>{expense.description}</h3>
        <small className="text-xs">
          {new Date(expense.createdAt).toLocaleDateString("en-za")}
        </small>
      </div>
      <div className="flex gap-2">
        <p>{currencyFormatter(expense.amount)}</p>
        <button
          className="text-red-500 text-lg hover:text-red-800"
          onClick={() => dispatch(deleteExpense(expense._id))}
        >
          <AiFillDelete />
        </button>
      </div>
    </section>
  );
}

export default ExpenseItem;
