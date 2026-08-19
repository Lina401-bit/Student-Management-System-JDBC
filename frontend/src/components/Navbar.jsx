import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../css/Navbar.css";

function Navbar() {

    const navigate = useNavigate();
    const location = useLocation();


    const handleLogout = () => {

        localStorage.removeItem("isLoggedIn");

        navigate("/");

    };


    return (

        <aside className="sidebar">


            {/* Logo */}

            <div className="logo-section">

                <div className="logo-icon">
                    🎓
                </div>


                <div className="logo-text">

                    <h2>
                        Student
                    </h2>

                    <span>
                        Management
                    </span>

                </div>

            </div>


            {/* Menu Title */}

            <h3 className="menu-title">

                MAIN MENU

            </h3>


            {/* Navigation */}

            <nav className="nav-menu">


                {/* Dashboard */}

                <button

                    className={`nav-item ${
                        location.pathname === "/dashboard"
                            ? "active"
                            : ""
                    }`}

                    onClick={() => navigate("/dashboard")}

                >

                    <span className="nav-icon">
                        📊
                    </span>

                    <span className="nav-label">
                        Dashboard
                    </span>

                </button>


                {/* Students */}

                <button

                    className={`nav-item ${
                        location.pathname === "/students"
                            ? "active"
                            : ""
                    }`}

                    onClick={() => navigate("/students")}

                >

                    <span className="nav-icon">
                        👥
                    </span>

                    <span className="nav-label">
                        Students
                    </span>

                </button>


                {/* Users */}

                <button

                    className={`nav-item ${
                        location.pathname === "/users"
                            ? "active"
                            : ""
                    }`}

                    onClick={() => navigate("/users")}

                >

                    <span className="nav-icon">
                        👤
                    </span>

                    <span className="nav-label">
                        Users
                    </span>

                </button>


                {/* Add Student */}

                <button

                    className={`nav-item ${
                        location.pathname === "/add-student"
                            ? "active"
                            : ""
                    }`}

                    onClick={() => navigate("/add-student")}

                >

                    <span className="nav-icon">
                        ➕
                    </span>

                    <span className="nav-label">
                        Add Student
                    </span>

                </button>


                {/* Search */}

                <button

                    className={`nav-item ${
                        location.pathname === "/search"
                            ? "active"
                            : ""
                    }`}

                    onClick={() => navigate("/search")}

                >

                    <span className="nav-icon">
                        🔍
                    </span>

                    <span className="nav-label">
                        Search
                    </span>

                </button>


                {/* Filter */}

                <button

                    className={`nav-item ${
                        location.pathname === "/filter"
                            ? "active"
                            : ""
                    }`}

                    onClick={() => navigate("/filter")}

                >

                    <span className="nav-icon">
                        ⚙️
                    </span>

                    <span className="nav-label">
                        Filter
                    </span>

                </button>


            </nav>


            {/* Logout */}

            <div className="logout-section">

                <button

                    className="logout-button"

                    onClick={handleLogout}

                >

                    <span className="nav-icon">
                        🚪
                    </span>

                    <span className="nav-label">
                        Logout
                    </span>

                </button>

            </div>


        </aside>

    );

}


export default Navbar;