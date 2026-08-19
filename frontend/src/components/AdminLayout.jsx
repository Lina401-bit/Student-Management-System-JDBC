import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Sidebar from "./Sidebar";
import "../css/AdminLayout.css";

function AdminLayout() {

    const navigate = useNavigate();

    useEffect(() => {

        const checkSession = () => {

            const username = localStorage.getItem("username");
            const loginTime = Number(localStorage.getItem("loginTime"));

            if (!username || !loginTime) {

                localStorage.clear();
                navigate("/");
                return;

            }

            // Session expiry time (1 hour)

            //const SESSION_TIMEOUT = 30 * 1000; // 30 seconds
            const SESSION_TIMEOUT = 60 * 60 * 1000;

            const currentTime = Date.now();

            if (currentTime - loginTime >= SESSION_TIMEOUT) {

                localStorage.clear();

                alert("Session expired. Please login again.");

                navigate("/");

            }

        };

        // Check immediately
        checkSession();

        // Check every 30 seconds
        const interval = setInterval(checkSession, 30000);

        return () => clearInterval(interval);

    }, [navigate]);

    return (

        <div className="admin-layout">

            <Sidebar />

            <main className="admin-content">

                <Outlet />

            </main>

        </div>

    );

}

export default AdminLayout;