import { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function ExpenseForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);
    const [expense, setExpense] = useState({
        id: null,
        description: "",
        amount: 0,
    });

    useEffect(() => {
        if (id) {
            setLoading(true);
            axiosClient
                .get(`/expense/${id}`)
                .then(({ data }) => {
                    setLoading(false);
                    setExpense(data);
                })
                .catch((error) => {
                    setLoading(false);
                    console.error("Error fetching expense:", error);
                });
        }
    }, [id]);

    const onSubmit = (ev) => {
        ev.preventDefault();
        if (expense.id) {
            axiosClient
                .put(`/expense/${expense.id}`, expense)
                .then(() => {
                    navigate("/expense");
                })
                .catch((err) => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors);
                    }
                });
        } else {
            axiosClient
                .post(`/expense`, expense)
                .then(() => {
                    navigate("/expense");
                })
                .catch((err) => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors);
                    }
                });
        }
    };
    return (
        <>
            {expense.id && <h1>Update Expense: {expense.description}</h1>}
            {!expense.id && <h1>New Expense</h1>}
            <div className="card animated fadeInDown">
                {loading && <div className="text-center">Loading...</div>}
                {errors && (
                    <div className="alert">
                        {Object.keys(errors).map((key) => (
                            <p key={key}>{errors[key][0]}</p>
                        ))}
                    </div>
                )}
                {!loading && (
                    <form onSubmit={onSubmit}>
                        <input
                            value={expense.description}
                            onChange={(ev) =>
                                setExpense({
                                    ...expense,
                                    description: ev.target.value,
                                })
                            }
                            placeholder="Description"
                            type="string"
                        />
                        <input
                            value={expense.amount}
                            onChange={(ev) =>
                                setExpense({
                                    ...expense,
                                    amount: parseFloat(ev.target.value),
                                })
                            }
                            placeholder="Amount"
                            type="number"
                        />
                        {/* <input
                            value={expense.expense_date}
                            onChange={(ev) =>
                                setExpense({
                                    ...expense,
                                    date: ev.target.value,
                                })
                            }
                            placeholder="Date"
                            type="date"
                        /> */}

                        <button className="btn btn-save">Submit</button>
                    </form>
                )}
            </div>
        </>
    );
}

export default ExpenseForm;
