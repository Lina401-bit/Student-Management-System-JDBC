import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/AddStudent.css";

function AddStudent() {

    const navigate = useNavigate();

    const [student, setStudent] = useState({

        name: "",
        email: "",
        department: "",
        city: ""

    });


    const [message, setMessage] = useState("");

    const [error, setError] = useState("");

    const [loading, setLoading] = useState(false);


    // Handle input changes

    const handleChange = (event) => {

        const { name, value } = event.target;


        setStudent({

            ...student,

            [name]: value

        });

    };


    // Submit form

    const handleSubmit = async (event) => {

        event.preventDefault();


        setMessage("");

        setError("");


        // Basic validation

        if (

            !student.name.trim() ||

            !student.email.trim() ||

            !student.department.trim() ||

            !student.city.trim()

        ) {

            setError(
                "Please fill in all fields."
            );

            return;

        }


        setLoading(true);


        try {


            const response = await fetch(
                "http://localhost:8080/students",
                {

                    method: "POST",

                    headers: {

                        "Content-Type": "application/json",

                        "Authorization": "Bearer " + localStorage.getItem("token")

                    },

                    body: JSON.stringify(student)

                }

            );


            if (!response.ok) {

                throw new Error(
                    "Failed to add student"
                );

            }


            setMessage(
                "Student added successfully!"
            );


            // Clear form

            setStudent({

                name: "",

                email: "",

                department: "",

                city: ""

            });


            // Go to students page

            setTimeout(() => {

                navigate("/students");

            }, 1000);


        }

        catch (error) {

            console.error(
                "Error adding student:",
                error
            );


            setError(
                "Unable to add student. Please try again."
            );

        }

        finally {

            setLoading(false);

        }

    };


    return (

        <div className="add-student-page">


            {/* HEADER */}

            <div className="add-student-header">

                <p className="add-student-label">

                    STUDENT MANAGEMENT SYSTEM

                </p>


                <h1>

                    Add New Student

                </h1>


                <p>

                    Add a new student record to the management system.

                </p>

            </div>


            {/* FORM CARD */}

            <div className="add-student-card">


                {/* CARD HEADER */}

                <div className="form-card-header">

                    <div className="form-icons">

                        <span>
                            ➕
                        </span>

                        <span>
                            🎓
                        </span>

                    </div>


                    <div>

                        <h2>

                            Student Information

                        </h2>


                        <p>

                            Enter the student's details below.

                        </p>

                    </div>

                </div>


                {/* SUCCESS MESSAGE */}

                {message && (

                    <div className="success-message">

                        {message}

                    </div>

                )}


                {/* ERROR MESSAGE */}

                {error && (

                    <div className="error-message">

                        {error}

                    </div>

                )}


                {/* FORM */}

                <form
                    onSubmit={handleSubmit}
                >


                    {/* NAME */}

                    <div className="form-group">

                        <label>

                            Full Name

                        </label>


                        <input

                            type="text"

                            name="name"

                            value={student.name}

                            onChange={handleChange}

                            placeholder="Enter student's full name"

                        />

                    </div>


                    {/* EMAIL */}

                    <div className="form-group">

                        <label>

                            Email Address

                        </label>


                        <input

                            type="email"

                            name="email"

                            value={student.email}

                            onChange={handleChange}

                            placeholder="student@example.com"

                        />

                    </div>


                    {/* DEPARTMENT */}

                    <div className="form-group">

                        <label>

                            Department

                        </label>


                        <input

                            type="text"

                            name="department"

                            value={student.department}

                            onChange={handleChange}

                            placeholder="e.g. Computer Science"

                        />

                    </div>


                    {/* CITY */}

                    <div className="form-group">

                        <label>

                            City

                        </label>


                        <input

                            type="text"

                            name="city"

                            value={student.city}

                            onChange={handleChange}

                            placeholder="Enter city"

                        />

                    </div>


                    {/* BUTTONS */}

                    <div className="form-actions">


                        <button

                            type="button"

                            className="cancel-btn"

                            onClick={() =>
                                navigate("/students")
                            }

                        >

                            Cancel

                        </button>


                        <button

                            type="submit"

                            className="submit-btn"

                            disabled={loading}

                        >

                            {loading

                                ? "Adding..."

                                : "➕ Add Student"

                            }

                        </button>


                    </div>


                </form>


            </div>


        </div>

    );

}


export default AddStudent;