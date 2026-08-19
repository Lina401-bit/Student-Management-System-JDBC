import { useNavigate, useLocation } from "react-router-dom";
import "../css/Sidebar.css";

function Sidebar() {

    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {

        localStorage.removeItem("token");

        navigate("/");

    };


    return (

        <aside className="sidebar">


            {/* =========================
                LOGO
            ========================== */}

            <div className="sidebar-logo">

                <div className="logo-icon">
                    🎓
                </div>

                <div>

                    <h2>
                        Student
                    </h2>

                    <h2>
                        Management
                    </h2>

                </div>

            </div>


            {/* =========================
                MAIN MENU
            ========================== */}

            <nav className="sidebar-navigation">


                <p className="menu-title">
                    MAIN MENU
                </p>


                {/* DASHBOARD */}

                <button
                    className={
                        `sidebar-link ${
                            location.pathname === "/dashboard"
                                ? "active"
                                : ""
                        }`
                    }

                    onClick={() =>
                        navigate("/dashboard")
                    }

                >

                    <span className="menu-icon">
                        📊
                    </span>

                    <span>
                        Dashboard
                    </span>

                </button>


                {/* STUDENTS */}

                <button
                    className={
                        `sidebar-link ${
                            location.pathname === "/students"
                                ? "active"
                                : ""
                        }`
                    }

                    onClick={() =>
                        navigate("/students")
                    }

                >

                    <span className="menu-icon">
                        👥
                    </span>

                    <span>
                        Students
                    </span>

                </button>


                {/* ADD STUDENT */}

                <button
                    className={
                        `sidebar-link ${
                            location.pathname === "/add-student"
                                ? "active"
                                : ""
                        }`
                    }

                    onClick={() =>
                        navigate("/add-student")
                    }

                >

                    <span className="menu-icon">
                        ➕
                    </span>

                    <span>
                        Add Student
                    </span>

                </button>


                {/* USERS */}

                <button
                    className={
                        `sidebar-link ${
                            location.pathname === "/users"
                                ? "active"
                                : ""
                        }`
                    }

                    onClick={() =>
                        navigate("/users")
                    }

                >

                    <span className="menu-icon">
                        👤
                    </span>

                    <span>
                        Users
                    </span>

                </button>


                {/* REPORTS */}

                <button
                    className={
                        `sidebar-link ${
                            location.pathname === "/reports"
                                ? "active"
                                : ""
                        }`
                    }

                    onClick={() =>
                        navigate("/reports")
                    }

                >

                    <span className="menu-icon">
                        📈
                    </span>

                    <span>
                        Reports
                    </span>

                </button>
                {/* ACTIVITY LOGS */}

                <button
                    className={
                        `sidebar-link ${
                            location.pathname === "/activity-logs"
                                ? "active"
                                : ""
                        }`
                    }

                    onClick={() =>
                        navigate("/activity-logs")
                    }

                >

                    <span className="menu-icon">
                        📋
                    </span>

                    <span>
                        Activity Logs
                    </span>

                </button>
{/* PROFILE */}

<button
    className={
        `sidebar-link ${
            location.pathname === "/profile"
                ? "active"
                : ""
        }`
    }

    onClick={() =>
        navigate("/profile")
    }

>

    <span className="menu-icon">
        👤
    </span>

    <span>
        Profile
    </span>

</button>

            </nav>


            {/* =========================
                SYSTEM MENU
            ========================== */}

            <div className="sidebar-bottom">


                <p className="menu-title">
                    SYSTEM
                </p>


                {/* SETTINGS */}

                <button
                    className={
                        `sidebar-link ${
                            location.pathname === "/settings"
                                ? "active"
                                : ""
                        }`
                    }

                    onClick={() =>
                        navigate("/settings")
                    }

                >

                    <span className="menu-icon">
                        ⚙️
                    </span>

                    <span>
                        Settings
                    </span>

                </button>


                {/* LOGOUT */}

                <button
                    className="sidebar-link logout-link"

                    onClick={
                        handleLogout
                    }

                >

                    <span className="menu-icon">
                        🚪
                    </span>

                    <span>
                        Logout
                    </span>

                </button>


            </div>


        </aside>

    );

}

export default Sidebar;