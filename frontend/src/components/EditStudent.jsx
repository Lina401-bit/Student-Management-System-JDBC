import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Navbar from "./Navbar";
import StudentService from "../services/StudentService";

import "../css/AddStudent.css";

function EditStudent() {

    const { id } = useParams();

    const navigate = useNavigate();


    const [student, setStudent] = useState({

        name: "",
        email: "",
        department: "",
        city: ""

    });


    const [error, setError] = useState("");


    useEffect(() => {

        loadStudent();

    }, [id]);


    const loadStudent = async () => {

        try {

            const response =
                await StudentService.getStudentById(id);

            setStudent(response.data);

        } catch (error) {

            console.error(
                "Error loading student:",
                error
            );

            setError(
                "Unable to load student details."
            );

        }

    };


    const handleChange = (e) => {

        setStudent({

            ...student,

            [e.target.name]: e.target.value

        });

    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await StudentService.updateStudent(
                id,
                student
            );

            alert(
                "Student updated successfully!"
            );

            navigate("/students");

        } catch (error) {

            console.error(
                "Error updating student:",
                error
            );

            setError(
                "Failed to update student."
            );

        }

    };


    return (

        <div className="add-student-layout">

            <Navbar />


            <main className="add-student-content">


                <div className="add-student-header">

                    <p className="page-label">

                        STUDENT MANAGEMENT

                    </p>


                    <h1>

                        Edit Student

                    </h1>


                    <p>

                        Update the student information below.

                    </p>

                </div>


                <div className="add-student-card">


                    {error && (

                        <div className="error-message">

                            {error}

                        </div>

                    )}


                    <form
                        onSubmit={handleSubmit}
                    >


                        <div className="form-grid">


                            <div className="form-group">

                                <label>

                                    Student Name

                                </label>


                                <input

                                    type="text"

                                    name="name"

                                    value={student.name}

                                    onChange={handleChange}

                                    required

                                />

                            </div>


                            <div className="form-group">

                                <label>

                                    Email

                                </label>


                                <input

                                    type="email"

                                    name="email"

                                    value={student.email}

                                    onChange={handleChange}

                                    required

                                />

                            </div>


                            <div className="form-group">

                                <label>

                                    Department

                                </label>


                                <input

                                    type="text"

                                    name="department"

                                    value={
                                        student.department
                                    }

                                    onChange={
                                        handleChange
                                    }

                                    required

                                />

                            </div>


                            <div className="form-group">

                                <label>

                                    City

                                </label>


                                <input

                                    type="text"

                                    name="city"

                                    value={student.city}

                                    onChange={handleChange}

                                    required

                                />

                            </div>


                        </div>


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

                            >

                                Update Student

                            </button>


                        </div>


                    </form>

                </div>

            </main>

        </div>

    );

}


export default EditStudent;