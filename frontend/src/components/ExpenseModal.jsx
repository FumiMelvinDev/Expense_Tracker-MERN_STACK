import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ColorRing } from "react-loader-spinner";
import { addExpense } from "../features/expenses/expenseSlice";

function ExpenseModal() {
  const [formData, setFormData] = useState({
    description: "",
    amount: "",
    color: "",
  });

  const { description, amount, color } = formData;

  const dispatch = useDispatch();

  const { isLoading } = useSelector((state) => state.expenses);

  const onChange = (e) => {
    const newDescription = e.target.value;

    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]:
        e.target.name === "amount"
          ? parseFloat(e.target.value)
          : e.target.value,
      description: newDescription,
      color: newColor,
    }));

    let newColor = "";

    switch (newDescription) {
      case "Entertainment":
        newColor = "#ec54fa";
        break;
      case "Car + Insurence":
        newColor = "#ac43fd";
        break;
      case "Rent":
        newColor = "#aa1234";
        break;
      case "Fuel":
        newColor = "#22ffaa";
        break;
      case "House payment":
        newColor = "#dfb2f4";
        break;
      case "Transport":
        newColor = "#51344d";
        break;
      case "Food":
        newColor = "#c03221";
        break;
      default:
        newColor = "";
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const expenseData = {
      description,
      amount,
      color,
    };

    dispatch(addExpense(expenseData));

    setFormData({
      description: "",
      amount: "",
      color: "",
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
      <form className="space-y-2 text-slate-600" onSubmit={onSubmit}>
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium leading-6"
          >
            Expense Description
          </label>
          <select
            id="description"
            name="description"
            type="text"
            value={description}
            onChange={onChange}
            autoComplete="description"
            required
            className="block w-full rounded-md border-0 py-1 shadow-sm ring-1 ring-inset ring-gray-300 placeholder focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-xs sm:leading-6"
          >
            <option value="">Select an Expense Description</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Car + Insurence">Car + Insurence</option>
            <option value="Rent">rent</option>
            <option value="Fuel">fuel</option>
            <option value="House payment">House payment</option>
            <option value="Transport">Transport</option>
            <option value="Food">Food</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="amount"
            className="block text-sm font-medium leading-6"
          >
            Expense amount
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
              className="block w-full rounded-md border-0 py-1 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-slate-100 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-xs sm:leading-6"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-teal-600 px-3 py-1 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
          >
            Add Expense
          </button>
        </div>
      </form>
    </div>
  );
}

export default ExpenseModal;
