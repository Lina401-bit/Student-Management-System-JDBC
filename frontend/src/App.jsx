import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./components/Login";
import Register from "./components/Register";

import Dashboard from "./components/Dashboard";
import Students from "./components/Students";
import AddStudent from "./components/AddStudent";
import Users from "./components/Users";
import Reports from "./components/Reports";
import Settings from "./components/Settings";

import Profile from "./components/Profile";
import UserProfile from "./components/UserProfile";
import ChangePassword from "./components/ChangePassword";
import ActivityLogs from "./components/ActivityLogs";
import UserDashboard from "./components/UserDashboard";
import UserLayout from "./components/UserLayout";
import AdminLayout from "./components/AdminLayout";

function App() {

    return (

        <Routes>

            {/* Public Routes */}

            <Route
                path="/"
                element={<Login />}
            />

            <Route
                path="/register"
                element={<Register />}
            />

            {/* Admin Routes */}

            <Route element={<AdminLayout />}>

                <Route
                    path="/dashboard"
                    element={<Dashboard />}
                />

                <Route
                    path="/students"
                    element={<Students />}
                />

                <Route
                    path="/add-student"
                    element={<AddStudent />}
                />

                <Route
                    path="/users"
                    element={<Users />}
                />

                <Route
                    path="/reports"
                    element={<Reports />}
                />
                <Route
                    path="/activity-logs"
                    element={<ActivityLogs />}
                />
                <Route
                    path="/profile"
                    element={<Profile />}
                />

                <Route
                    path="/change-password"
                    element={<ChangePassword />}
                />

                <Route
                    path="/settings"
                    element={<Settings />}
                />

            </Route>

            {/* User Routes */}

            <Route element={<UserLayout />}>

                <Route
                    path="/user-dashboard"
                    element={<UserDashboard />}
                />

                <Route
                    path="/user/profile"
                    element={<UserProfile />}
                />

            </Route>

            {/* Default */}

            <Route
                path="*"
                element={<Navigate to="/" />}
            />

        </Routes>

    );

}

export default App;