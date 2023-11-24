import { createBrowserRouter } from "react-router-dom";
import Login from "./views/Login";
import SignUp from "./views/SignUp";
import Users from "./views/Users";
import NotFound from "./views/NotFound";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import Dashboard from "./views/Dashboard";
import { Navigate } from "react-router-dom";
import UserForm from "./views/UserForm";
import ExpenseForm from "./views/ExpenseForm";
import Expense from "./views/Expense";

const router = createBrowserRouter([
    {
        path: "/",
        element: <DefaultLayout />,
        children: [
            {
                path: "/",
                element: <Navigate to="/users" />,
            },
            {
                path: "/dashboard",
                element: <Dashboard />,
            },
            {
                path: "/users",
                element: <Users />,
            },
            {
                path: "/users/new",
                element: <UserForm key="userCreate" />,
            },
            {
                path: "/users/:id",
                element: <UserForm key="userUpdate" />,
            },
            {
                path: "/expense",
                element: <Expense />,
            },
            {
                path: "/expense/new",
                element: <ExpenseForm key="expenseCreate" />,
            },
            {
                path: "/expense/:id",
                element: <ExpenseForm key="expenseUpdate" />,
            },
        ],
    },
    {
        path: "/",
        element: <GuestLayout />,
        children: [
            {
                path: "/login",
                element: <Login />,
            },

            {
                path: "signup",
                element: <SignUp />,
            },
        ],
    },
    {
        path: "*",
        element: <NotFound />,
    },
]);

export default router;
