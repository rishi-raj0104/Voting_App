import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import AuthPage from "./components/AuthPage";
import AdminDashboard from "./components/AdminDashboard";
import PrivateRoute from './PrivateRoute';
import UserDashboard from "./components/UserDashboard";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <AuthPage />
            },
            {
                path: "/user",
                element: (
                    <PrivateRoute allowedRoles={['voter']}>
                        <UserDashboard />
                    </PrivateRoute>
                )
            },
            {
                path: "/admin",
                element: (
                    <PrivateRoute allowedRoles={['admin']}>
                        <AdminDashboard />
                    </PrivateRoute>
                )
            },
            {
                path: "*",
                element: <h1>Page Not Found</h1>,
            }
        ]
    },
]);

export default router;
