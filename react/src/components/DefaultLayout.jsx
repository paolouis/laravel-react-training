import { Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
import { useEffect } from "react";

function DefaultLayout() {
    const { user, token, setUser, setToken } = useStateContext();

    useEffect(() => {
        axiosClient.get("/user").then(({ data }) => {
            setUser(data);
        });
    }, [setUser]);

    if (!token) {
        return <Navigate to="/login" />;
    }

    const onLogout = (ev) => {
        ev.preventDefault();

        axiosClient.post("/logout").then(() => {
            setUser({});
            setToken(null);
        });
    };

    return (
        <div id="defaultLayout">
            <aside>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/users">Users</Link>
                <Link to="/expense">Expense List</Link>
            </aside>
            <div className="content">
                <header>
                    <div>Header</div>
                    User Info
                    <div>
                        {user.name}
                        <a href="#" onClick={onLogout} className="btn-logout">
                            Logout
                        </a>
                    </div>
                </header>
                <main>
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default DefaultLayout;
