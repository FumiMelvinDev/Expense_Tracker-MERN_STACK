import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../components/Modal";
import IncomeModal from "../components/IncomeModal";
import ExpenseModal from "../components/ExpenseModal";
import { currencyFormatter } from "../lib/utils";
import { getAllExpenses, reset } from "../features/expenses/expenseSlice";
import ExpenseItem from "../components/ExpenseItem";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { ColorRing } from "react-loader-spinner";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function Dashboard() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [expenseModalIsOpen, setExpenseModalIsOpen] = useState(false);
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const { expenses, isLoading, isError, message } = useSelector(
    (state) => state.expenses
  );

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
          <div className="">
            <small className="text-xs">My Balance</small>
            <h3>{currencyFormatter(35000)}</h3>
          </div>
        </section>

        <section className="flex items-center gap-2 text-xs">
          <button
            className="btn-secondary border-[#7D4E57] bg-[#b472a4] px-3 py-2 rounded-lg ring-teal-800"
            onClick={() => {
              setExpenseModalIsOpen(true);
            }}
          >
            + expenses
          </button>
          <button
            className="btn-secondary border-[#7D4E57] bg-[#A997DF] px-3 py-2 rounded-lg ring-teal-800"
            onClick={() => {
              setModalIsOpen(true);
            }}
          >
            + income
          </button>
        </section>
        <section>
          <div className="my-4">
            <h2 className="mb-2">Expenses History</h2>
            {expenses.length > 0 ? (
              <div className="space-y-2">
                {expenses.map((expense) => (
                  <ExpenseItem key={expense._id} expense={expense} />
                ))}
              </div>
            ) : (
              <h2>No expenses history</h2>
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
