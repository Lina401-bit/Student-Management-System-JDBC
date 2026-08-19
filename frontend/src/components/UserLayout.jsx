import { Outlet, NavLink, useNavigate } from "react-router-dom";
import "../css/UserLayout.css";

function UserLayout() {

    const navigate = useNavigate();

    const logout = () => {
        localStorage.clear();
        navigate("/");
    };

    return (

        <div className="user-layout">

            <aside className="user-sidebar">

                <h2 className="user-logo">
                    Student Portal
                </h2>

                <NavLink
                    to="/user-dashboard"
                    className="user-menu"
                >
                    🏠 Dashboard
                </NavLink>

                <NavLink
                    to="/user/profile"
                    className="user-menu"
                >
                    👤 My Profile
                </NavLink>

                <button
                    className="user-logout"
                    onClick={logout}
                >
                    Logout
                </button>

            </aside>

            <main className="user-content">

                <Outlet />

            </main>

        </div>

    );

}

export default UserLayout;