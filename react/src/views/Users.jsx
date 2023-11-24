import axiosClient from "../axios-client";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getUsers();
    }, []);

    const onDelete = (u) => {
        if (!window.confirm("Are you sure you want to delete this user?")) {
            return;
        }

        axiosClient.delete(`/users/${u.id}`).then(() => {
            //TODO show notification
            getUsers();
        });
    };

    const getUsers = () => {
        axiosClient
            .get("/users")
            .then(({ data }) => {
                setUsers(data.data);
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
                <h1>Users</h1>
                <Link className="btn btn-add" to="/users/new">
                    Add new
                </Link>
            </div>
            <div className="card animated fadeIndown">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Create Date</th>
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
                        {users.map((u) => (
                            <tr key={u.id}>
                                <td>{u.id}</td>
                                <td>{u.name}</td>
                                <td>{u.email}</td>
                                <td>{u.created_at}</td>
                                <td>{u.status}</td>
                                <td>
                                    <Link
                                        className="btn-edit"
                                        to={"/users/" + u.id}
                                    >
                                        Edit
                                    </Link>
                                    &nbsp;
                                    <button
                                        onClick={() => onDelete(u)}
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

export default Users;
