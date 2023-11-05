import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addIncome, getAllIncome, reset } from "../features/income/incomeSlice";
import { ColorRing } from "react-loader-spinner";
import IncomeItem from "./IncomeItem";

function IncomeModal() {
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
  });

  const { title, amount } = formData;

  const dispatch = useDispatch();

  const { incomes, isLoading, isError, message } = useSelector(
    (state) => state.incomes
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

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]:
        e.target.name === "amount"
          ? parseFloat(e.target.value)
          : e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const incomeData = {
      title,
      amount,
    };

    dispatch(addIncome(incomeData));

    setFormData({
      title: "",
      amount: "",
    });
  };

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
    <div className="w-full">
      <form className="space-y-2" onSubmit={onSubmit}>
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium leading-6 text-slate-100"
          >
            Title
          </label>
          <div className="">
            <input
              id="title"
              name="title"
              type="text"
              value={title}
              onChange={onChange}
              autoComplete="title"
              required
              className="block w-full rounded-md border-0 py-1 text-slate-100 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-slate-100 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-xs sm:leading-6"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="amount"
            className="block text-sm font-medium leading-6 text-slate-100"
          >
            Income amount
          </label>
          <div className="">
            <input
              id="amount"
              name="amount"
              type="number"
              value={amount}
              onChange={onChange}
              autoComplete="amount"
              required
              className="block w-full rounded-md border-0 py-1 text-slate-100 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-slate-100 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-xs sm:leading-6"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-teal-600 px-3 py-1 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
          >
            Add Income
          </button>
        </div>
      </form>
      <div className="">
        <h2>Income History</h2>
        {incomes.length > 0 ? (
          <div className="">
            {incomes.map((income) => (
              <IncomeItem key={income._id} income={income} />
            ))}
          </div>
        ) : (
          <h2>No income history</h2>
        )}
      </div>
    </div>
  );
}

export default IncomeModal;
