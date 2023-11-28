import axiosClient from "../axios-client";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Expense() {
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getExpenses();
    }, []);

    const onDelete = (expense) => {
        if (!window.confirm("Are you sure you want to delete this expense?")) {
            return;
        }

        axiosClient.delete(`/expense/${expense.id}`).then(() => {
            // TODO: show notification
            getExpenses();
        });
    };

    const getExpenses = () => {
        axiosClient
            .get("/expense")
            .then(({ data }) => {
                setExpenses(data.data);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    return (
        <div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <h1>Expenses</h1>
                <Link className="btn btn-add" to="/expense/new">
                    Add new
                </Link>
            </div>
            <div className="card animated fadeIndown">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Description</th>
                            <th>Amount</th>
                            <th>Created at</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    {loading && (
                        <tbody>
                            <tr>
                                <td className="text-center" colSpan="5">
                                    Loading...
                                </td>
                            </tr>
                        </tbody>
                    )}
                    <tbody>
                        {expenses.map((expense) => (
                            <tr key={expense.id}>
                                <td>{expense.id}</td>
                                <td>{expense.description}</td>
                                <td>{expense.amount}</td>
                                <td>{expense.created_at}</td>
                                <td>{expense.status}</td>
                                <td>
                                    <Link
                                        className="btn-edit"
                                        to={"/expense/" + expense.id}
                                    >
                                        Edit
                                    </Link>
                                    &nbsp;
                                    <button
                                        onClick={() => onDelete(expense)}
                                        className="btn-delete"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
export default Expense;
