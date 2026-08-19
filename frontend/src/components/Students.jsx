import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Students.css";
function Students() {

    const navigate = useNavigate();

    const [students, setStudents] = useState([]);

    const [loading, setLoading] = useState(true);

    const [editStudent, setEditStudent] = useState(null);

        const [currentPage, setCurrentPage] = useState(0);
        const [totalPages, setTotalPages] = useState(0);
        const [totalStudents, setTotalStudents] = useState(0);

      const studentsPerPage = 10;
    // Fetch all students

   const fetchStudents = (page = 0) => {

       const token = localStorage.getItem("token");

       setLoading(true);

       fetch(
           `http://localhost:8080/students?page=${page}&size=${studentsPerPage}`,
           {
               headers: {
                   Authorization: `Bearer ${token}`
               }
           }
       )

       .then((response) => {

           if (!response.ok) {
               throw new Error("Failed to fetch students");
           }

           return response.json();

       })

       .then((data) => {

           if (data.content) {

               setStudents(data.content);

               setTotalPages(data.totalPages);

               setTotalStudents(data.totalElements);

           }

           else if (Array.isArray(data)) {

               setStudents(data);

               setTotalPages(1);

               setTotalStudents(data.length);

           }

           setLoading(false);

       })

       .catch((error) => {

           console.error(
               "Error fetching students:",
               error
           );

           setLoading(false);

       });

   };
   useEffect(() => {

       fetchStudents(currentPage);

   }, [currentPage]);

const handleEdit = (student) => {

    setEditStudent(student);

};
const handleUpdate = () => {

    fetch(
        `http://localhost:8080/students/${editStudent.id}`,
        {
            method: "PUT",

            headers: {

                "Content-Type": "application/json",

                Authorization:
                `Bearer ${localStorage.getItem("token")}`

            },

            body: JSON.stringify(editStudent)

        }
    )

    .then(response => response.json())

    .then(updatedStudent => {


        setStudents(
            students.map(student =>
                student.id === updatedStudent.id
                ? updatedStudent
                : student
            )
        );


        setEditStudent(null);


    });

};
    // Delete student

    const handleDelete = (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to deactivate this student?"
        );


        if (!confirmDelete) {

            return;

        }


        fetch(
            `http://localhost:8080/students/${id}`,
            {
                method: "DELETE",

                headers: {

                    Authorization:
                        `Bearer ${localStorage.getItem("token")}`

                }
            }
        )

            .then((response) => {

                if (response.ok) {

                    setStudents(
                        (previousStudents) =>

                            previousStudents.filter(
                                (student) =>
                                    student.id !== id
                            )

                    );

                }

            })

            .catch((error) => {

                console.error(
                    "Error deleting student:",
                    error
                );

            });

    };


    return (

        <div className="students-page">

            {/* PAGE HEADER */}

            <div className="students-header">

                <div>

                    <p className="students-label">
                        STUDENT MANAGEMENT
                    </p>

                    <h1>
                        Students
                    </h1>

                    <p className="students-description">
                        Manage and view all student records.
                    </p>

                </div>


                <button
                    className="add-student-btn"
                    onClick={() =>
                        navigate("/add-student")
                    }
                >
                    <span>+</span>
                    Add Student
                </button>

            </div>


            {/* EDIT STUDENT */}

            {editStudent && (

                <div className="edit-box">

                    <h2>Edit Student</h2>

                    <input
                        value={editStudent.name}
                        onChange={(e) =>
                            setEditStudent({
                                ...editStudent,
                                name: e.target.value
                            })
                        }
                    />

                    <input
                        value={editStudent.email}
                        onChange={(e) =>
                            setEditStudent({
                                ...editStudent,
                                email: e.target.value
                            })
                        }
                    />

                    <input
                        value={editStudent.department}
                        onChange={(e) =>
                            setEditStudent({
                                ...editStudent,
                                department: e.target.value
                            })
                        }
                    />

                    <input
                        value={editStudent.city}
                        onChange={(e) =>
                            setEditStudent({
                                ...editStudent,
                                city: e.target.value
                            })
                        }
                    />

                    <button onClick={handleUpdate}>
                        Save Changes
                    </button>

                    <button
                        onClick={() =>
                            setEditStudent(null)
                        }
                    >
                        Cancel
                    </button>

                </div>

            )}


            {/* STUDENTS TABLE */}

            <div className="students-container">

                <div className="student-table">

                    {/* TABLE HEADER */}

                    <div className="table-header">

                        <div className="name-column">
                            Name
                        </div>

                        <div className="email-column">
                            Email
                        </div>

                        <div className="department-column">
                            Department
                        </div>

                        <div className="city-column">
                            City
                        </div>

                        <div className="actions-column">
                            Actions
                        </div>

                    </div>


                    {/* LOADING */}

                    {loading && (

                        <div className="empty-message">
                            Loading students...
                        </div>

                    )}


                    {/* NO STUDENTS */}

                    {!loading &&
                        students.length === 0 && (

                            <div className="empty-message">
                                No students found.
                            </div>

                        )
                    }


                    {/* STUDENT ROWS */}

                    {!loading &&
                        students.map((student) => (

                            <div
                                className="table-row"
                                key={student.id}
                            >

                                <div className="name-column">

                                    <div className="student-name-cell">

                                        <div className="student-avatar">

                                            {student.name
                                                ?.charAt(0)
                                                .toUpperCase()
                                            }

                                        </div>

                                        <span className="student-name">
                                            {student.name}
                                        </span>

                                    </div>

                                </div>


                                <div className="email-column">

                                    <span className="student-email">
                                        {student.email}
                                    </span>

                                </div>


                                <div className="department-column">

                                    <span className="department-badge">
                                        {student.department}
                                    </span>

                                </div>


                                <div className="city-column">
                                    {student.city}
                                </div>


                                <div className="actions-column">

                                    <div className="action-buttons">

                                        <button
                                            className="edit-btn"
                                            onClick={() =>
                                                handleEdit(student)
                                            }
                                        >
                                            Edit
                                        </button>

                                        <button
                                            className="delete-btn"
                                            onClick={() =>
                                                handleDelete(student.id)
                                            }
                                        >
                                            Deactivate
                                        </button>

                                    </div>

                                </div>

                            </div>

                        ))
                    }

                </div>

            </div>


            {/* PAGINATION */}

            {!loading && totalStudents > 0 && (

                <div className="students-pagination">

                    <div className="pagination-info">

                        Showing{" "}
                        {currentPage * studentsPerPage + 1}
                        {" - "}
                        {Math.min(
                            (currentPage + 1) * studentsPerPage,
                            totalStudents
                        )}
                        {" of "}
                        {totalStudents}

                    </div>


                    <div className="pagination-buttons">

                        <button
                            disabled={currentPage === 0}
                            onClick={() =>
                                setCurrentPage(currentPage - 1)
                            }
                        >
                            ← Previous
                        </button>


                        {Array.from(
                            { length: totalPages },
                            (_, index) => index
                        ).map((page) => (

                            <button
                                key={page}
                                className={
                                    currentPage === page
                                        ? "active-page"
                                        : ""
                                }
                                onClick={() =>
                                    setCurrentPage(page)
                                }
                            >
                                {page + 1}
                            </button>

                        ))}


                        <button
                            disabled={
                                currentPage === totalPages - 1
                            }
                            onClick={() =>
                                setCurrentPage(currentPage + 1)
                            }
                        >
                            Next →
                        </button>

                    </div>

                </div>

            )}

        </div>

    );
    }

    export default Students;