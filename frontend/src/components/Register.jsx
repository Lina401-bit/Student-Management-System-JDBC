import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/UserService";
import "../css/Register.css";

function Register() {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [address, setAddress] = useState("");
    const [course, setCourse] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleRegister = async (event) => {

        event.preventDefault();

        setError("");
        setSuccess("");

        // Check password confirmation
        if (password !== confirmPassword) {

            setError("Passwords do not match.");
            return;

        }

        try {

            const response = await registerUser({

                username,
                password,
                email,
                contactNumber,
                address,
                course

            });

            console.log(
                "Registration Response:",
                response.data
            );

            setSuccess("Registration Successful!");

            // Redirect to Login page after 1.5 seconds
            setTimeout(() => {

                navigate("/login");

            }, 1500);

        } catch (error) {

            console.error(
                "Registration Error:",
                error
            );

            setError(
                error.response?.data ||
                "Registration failed. Please try again."
            );

        }

    };


    return (

        <div className="register-page">

            <div className="register-card">

                <div className="register-header">

                    <h1>
                        Create Account
                    </h1>

                    <p>
                        Register for Student Management System
                    </p>

                </div>


                <form
                    className="register-form"
                    onSubmit={handleRegister}
                >
<div className="form-group">

    <label htmlFor="email">
        Email
    </label>

    <input
        id="email"
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(event) =>
            setEmail(event.target.value)
        }
        required
    />

</div>


<div className="form-group">

    <label htmlFor="contactNumber">
        Contact Number
    </label>

    <input
        id="contactNumber"
        type="text"
        placeholder="Enter contact number"
        value={contactNumber}
        onChange={(event) =>
            setContactNumber(event.target.value)
        }
        required
    />

</div>


<div className="form-group">

    <label htmlFor="address">
        Address
    </label>

    <input
        id="address"
        type="text"
        placeholder="Enter your address"
        value={address}
        onChange={(event) =>
            setAddress(event.target.value)
        }
        required
    />

</div>


<div className="form-group">

    <label htmlFor="course">
        Course
    </label>

    <input
        id="course"
        type="text"
        placeholder="Enter your course"
        value={course}
        onChange={(event) =>
            setCourse(event.target.value)
        }
        required
    />

</div>
                    <div className="form-group">

                        <label htmlFor="username">
                            Username
                        </label>

                        <input
                            id="username"
                            type="text"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(event) =>
                                setUsername(event.target.value)
                            }
                            required
                        />

                    </div>


                    <div className="form-group">

                        <label htmlFor="password">
                            Password
                        </label>

                        <input
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                            required
                        />

                    </div>


                    <div className="form-group">

                        <label htmlFor="confirmPassword">
                            Confirm Password
                        </label>

                        <input
                            id="confirmPassword"
                            type="password"
                            placeholder="Confirm your password"
                            value={confirmPassword}
                            onChange={(event) =>
                                setConfirmPassword(event.target.value)
                            }
                            required
                        />

                    </div>


                    {error && (

                        <p className="register-error">
                            {error}
                        </p>

                    )}


                    {success && (

                        <p className="register-success">
                            {success}
                        </p>

                    )}


                    <button
                        type="submit"
                        className="register-button"
                    >
                        Create Account
                    </button>

                </form>


                <div className="register-footer">

                    <p>
                        Already have an account?
                    </p>

                    <button
                        type="button"
                        className="signin-button"
                        onClick={() => navigate("/login")}
                    >
                        Sign In
                    </button>

                </div>

            </div>

        </div>

    );

}

export default Register;