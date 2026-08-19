import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";



import "../css/Dashboard.css";

import img from "../assets/img.jpg";


function Dashboard() {


    const navigate = useNavigate();


    const [students, setStudents] = useState([]);



    useEffect(() => {

        const token = localStorage.getItem("token");


        fetch("http://localhost:8080/students?page=0&size=1000", {

            headers: {

                Authorization: `Bearer ${token}`

            }

        })

        .then((response) => response.json())

        .then((data) => {

            if (data.content) {

                setStudents(data.content);

            }

            else if (Array.isArray(data)) {

                setStudents(data);

            }

        })
        .catch((error) => {

            console.error(
                "Error fetching students:",
                error
            );

        });


    }, []);


    const recentStudents = students.slice(0,5);




    return (

        <div className="admin-layout">






            <main className="dashboard-content">



                {/* WELCOME SECTION */}


                <section className="welcome-card">


                    <div>


                        <p className="welcome-label">

                            STUDENT MANAGEMENT SYSTEM

                        </p>



                        <h1>

                            Welcome back, Lina 👋

                        </h1>



                        <p className="welcome-text">

                            Manage and monitor student records efficiently from one place.

                        </p>


                    </div>





                    <div className="system-status">

                        <span></span>

                        System Active

                    </div>





                    <div className="admin-profile">


                        <img

                            src={img}

                            alt="Lina"

                            className="admin-photo"

                        />



                        <div>

                            <h3>
                                Lina Patil
                            </h3>


                            <p>
                                Admin
                            </p>


                        </div>


                    </div>



                </section>







                {/* STATISTICS CARDS */}


                <section className="stats-grid">



                    <div className="stat-card">


                        <div className="stat-icon students-icon">

                            👥

                        </div>



                        <div>

                            <p>
                                Total Students
                            </p>


                            <h2>
                                {students.length}
                            </h2>


                        </div>



                    </div>






                    <div className="stat-card">


                        <div className="stat-icon active-icon">

                            ✓

                        </div>



                        <div>


                            <p>
                                Active Records
                            </p>


                            <h2>
                                {students.length}
                            </h2>


                        </div>



                    </div>







                    <div className="stat-card">


                        <div className="stat-icon recent-icon">

                            🕘

                        </div>



                        <div>


                            <p>
                                Recently Added
                            </p>


                            <h2>
                                {recentStudents.length}
                            </h2>


                        </div>



                    </div>




                </section>









                {/* RECENT STUDENTS */}



                <section className="recent-section">



                    <div className="recent-header">



                        <div>


                            <p className="section-label">

                                OVERVIEW

                            </p>



                            <h2>

                                Recently Added Records

                            </h2>



                        </div>





                        <button

                            className="view-all-btn"

                            onClick={() =>
                                navigate("/students")
                            }

                        >

                            View All Students →

                        </button>



                    </div>







                    <div className="student-cards">



                        {

                        recentStudents.map((student)=>(


                            <div

                                className="student-card"

                                key={student.id}

                            >



                                <div className="student-avatar">


                                    {

                                    student.name
                                    ?.charAt(0)
                                    .toUpperCase()

                                    }


                                </div>





                                <h3>

                                    {student.name}

                                </h3>





                                <p className="student-email">

                                    {student.email}

                                </p>





                                <div className="student-tags">


                                    <span>

                                        {student.department}

                                    </span>



                                    <span>

                                        {student.city}

                                    </span>


                                </div>



                            </div>



                        ))

                        }



                    </div>




                </section>






            </main>



        </div>


    );

}


export default Dashboard;