import { useEffect, useState } from "react";
import axios from "axios";
import "../css/UserDashboard.css";

function UserDashboard() {

    const [user, setUser] = useState(null);

    useEffect(() => {

        const token = localStorage.getItem("token");

        axios.get("http://localhost:8080/profile", {

            headers: {
                Authorization: `Bearer ${token}`
            }

        })
        .then((response) => {

            setUser(response.data);

        })
        .catch((error) => {

            console.log(error);

        });

    }, []);

    const getAvatar = () => {

        if (!user?.username) return "U";

        return user.username.charAt(0).toUpperCase();

    };

    return (

        <div className="user-home">

            <div className="welcome-card">

                <h1>
                    Welcome {user?.fullName || user?.username} 👋
                </h1>

                <p>
                    Student Portal Dashboard
                </p>

            </div>

            <div className="user-summary">

                <div className="user-card">

                    <div className="user-avatar">
                        {getAvatar()}
                    </div>

                    <h2>
                        {user?.fullName}
                    </h2>

                    <p>
                        {user?.role?.name}
                    </p>

                </div>

                <div className="info-card">

                    <div className="info-row">
                        <span className="info-label">Username</span>
                        <span className="info-value">{user?.username}</span>
                    </div>

                    <div className="info-row">
                        <span className="info-label">Email</span>
                        <span className="info-value">{user?.email}</span>
                    </div>

                    <div className="info-row">
                        <span className="info-label">Contact</span>
                        <span className="info-value">{user?.contactNumber}</span>
                    </div>

                    <div className="info-row">
                        <span className="info-label">Address</span>
                        <span className="info-value">{user?.address}</span>
                    </div>

                    <div className="info-row">
                        <span className="info-label">Course</span>
                        <span className="info-value">
                            {user?.course || "Not Available"}
                        </span>
                    </div>

                    <div className="info-row">
                        <span className="info-label">Status</span>
                        <span className="info-value">{user?.status}</span>
                    </div>

                </div>

            </div>

        </div>

    );

}

export default UserDashboard;