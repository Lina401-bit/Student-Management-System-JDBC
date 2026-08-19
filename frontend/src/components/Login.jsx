import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/UserService";
import "../css/Login.css";

function Login() {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (event) => {

        event.preventDefault();

        setError("");
        setLoading(true);

        try {

            const response = await loginUser(
                username,
                password
            );
console.log(response.data);
            const token = response.data.token;

            localStorage.setItem(
                "token",
                token
            );

            localStorage.setItem(
                "username",
                response.data.username
            );

            localStorage.setItem(
                "role",
                response.data.role
            );
            // Save Login Time
            localStorage.setItem(
                "loginTime",
                Date.now().toString()
            );

           const role = response.data.role?.toLowerCase();

           if (role === "admin") {

               navigate("/dashboard");

           } else {

               navigate("/user-dashboard");

           }

        }

        catch (error) {

            console.error(error);

            setError(
                error.response?.data ||
                "Invalid Username or Password"
            );

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <div className="login-page">

            {/* LEFT SIDE */}

            <div className="login-brand-section">

                <div className="brand-content">

                    <div className="brand-logo">
                        🎓
                    </div>

                    <h1>
                        Student
                        <br />
                        Management
                        <br />
                        System
                    </h1>

                    <p>
                        A modern platform to manage students,
                        departments, reports and administrators
                        from one secure dashboard.
                    </p>

                    <div className="brand-features">

                        <div>
                            ✅ Student Management
                        </div>

                        <div>
                            ✅ User Administration
                        </div>

                        <div>
                            ✅ Reports & Analytics
                        </div>

                        <div>
                            ✅ Secure Login
                        </div>

                    </div>

                </div>

            </div>

            {/* RIGHT SIDE */}

            <div className="login-form-section">

                <div className="login-card">

                    <div className="login-header">

                        <div className="login-small-title">
                            WELCOME BACK
                        </div>

                        <h2>
                            Login
                        </h2>

                        <p>
                            Login to Student Management System
                        </p>

                    </div>

                    <form
                        className="login-form"
                        onSubmit={handleLogin}
                    >

                        <div className="input-group">

                            <label>
                                Username
                            </label>

                            <div className="input-wrapper">

                                <span>
                                    👤
                                </span>

                                <input
                                    type="text"
                                    placeholder="Enter username"
                                    value={username}
                                    onChange={(e) =>
                                        setUsername(
                                            e.target.value
                                        )
                                    }
                                    required
                                />

                            </div>

                        </div>

                        <div className="input-group">

                            <label>
                                Password
                            </label>

                            <div className="input-wrapper">

                                <span>
                                    🔒
                                </span>

                                <input
                                    type="password"
                                    placeholder="Enter password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(
                                            e.target.value
                                        )
                                    }
                                    required
                                />

                            </div>

                        </div>

                        {error && (

                            <div className="login-error">

                                {error}

                            </div>

                        )}

                        <button
                            className="login-button"
                            type="submit"
                            disabled={loading}
                        >

                            {loading
                                ? "Signing In..."
                                : "Sign In"}

                        </button>

                    </form>

                    <div className="login-footer">

                        <span>
                            Don't have an account?
                        </span>

                        <button
                            type="button"
                            onClick={() =>
                                navigate("/register")
                            }
                        >

                            Create Account

                        </button>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Login;