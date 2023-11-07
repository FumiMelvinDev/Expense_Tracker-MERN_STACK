import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../components/Modal";
import IncomeModal from "../components/IncomeModal";
import ExpenseModal from "../components/ExpenseModal";
import { currencyFormatter } from "../lib/utils";
import { getAllExpenses, reset } from "../features/expenses/expenseSlice";
import ExpenseItem from "../components/ExpenseItem";
import { ColorRing } from "react-loader-spinner";
import { getAllIncome } from "../features/income/incomeSlice";

function Dashboard() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [expenseModalIsOpen, setExpenseModalIsOpen] = useState(false);
  const navigate = useNavigate();

  const { incomes } = useSelector((state) => state.incomes);

  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const { expenses, isLoading, isError, message } = useSelector(
    (state) => state.expenses
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    dispatch(getAllIncome());

    return () => {
      dispatch(reset());
    };
  }, [isError, message, dispatch]);

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    dispatch(getAllExpenses());

    return () => {
      dispatch(reset());
    };
  }, [isError, message, dispatch]);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  // Filter expenses for the last 32 days
  const thirtyTwoDaysAgo = new Date();
  thirtyTwoDaysAgo.setDate(thirtyTwoDaysAgo.getDate() - 32);

  const expensesLast32Days = expenses.filter(
    (expense) => new Date(expense.createdAt) >= thirtyTwoDaysAgo
  );

  // Calculate the total expenses for the last 32 days
  const totalExpensesLast32Days = expensesLast32Days.reduce(
    (total, expense) => total + expense.amount,
    0
  );

  // Calculate total income
  const totalIncome = incomes.reduce(
    (total, income) => total + income.amount,
    0
  );

  if (isLoading) {
    return (
      <ColorRing
        visible={true}
        height="80"
        width="80"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        colors={["#b8c480", "#B2A3B5", "#F4442E", "#51E5FF", "#429EA6"]}
      />
    );
  }

  return (
    <>
      <main className="text-slate-300">
        <section>
          <div className="sm:flex items-baseline gap-2">
            <div className="flex items-baseline gap-2">
              <small className="text-xs">My Balance</small>
              <h3>
                {currencyFormatter(totalIncome - totalExpensesLast32Days)}
              </h3>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <button
                className="btn-secondary border-[#7D4E57] bg-[#b472a4] px-2 py-1 rounded-lg ring-teal-800"
                onClick={() => {
                  setExpenseModalIsOpen(true);
                }}
              >
                + expenses
              </button>
              <button
                className="btn-secondary border-[#7D4E57] bg-[#A997DF] px-2 py-1 rounded-lg ring-teal-800"
                onClick={() => {
                  setModalIsOpen(true);
                }}
              >
                + income
              </button>
            </div>
          </div>
        </section>
        <section>
          <div className="my-4">
            <h2 className="">Expenses History</h2>
            <div className="flex items-baseline gap-2">
              <small className="text-xs mb-2">Last 32 Days</small>
              <p>{currencyFormatter(totalExpensesLast32Days)}</p>
            </div>
            {expensesLast32Days.length > 0 ? (
              <div className="space-y-2">
                {expensesLast32Days.map((expense) => (
                  <ExpenseItem key={expense._id} expense={expense} />
                ))}
              </div>
            ) : (
              <>
                <h2>No expenses history</h2>
              </>
            )}
          </div>
        </section>
      </main>
      <div className="">
        <Modal open={modalIsOpen} close={setModalIsOpen}>
          <IncomeModal />
        </Modal>
        <Modal open={expenseModalIsOpen} close={setExpenseModalIsOpen}>
          <ExpenseModal />
        </Modal>
      </div>
    </>
  );
}

export default Dashboard;
