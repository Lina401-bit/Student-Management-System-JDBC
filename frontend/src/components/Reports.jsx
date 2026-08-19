import React, { useEffect, useState } from "react";
import "../css/Reports.css";

function Reports() {

    const [students, setStudents] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetch("http://localhost:8080/students", {

            headers: {

                Authorization: `Bearer ${localStorage.getItem("token")}`

            }

        })

        .then((response) => {

            if (!response.ok) {
                throw new Error("Failed to fetch students");
            }

            return response.json();

        })

        .then((data) => {

            if (data.content) {
                setStudents(data.content);
            } else if (Array.isArray(data)) {
                setStudents(data);
            }

            setLoading(false);

        })

        .catch((error) => {

            console.error("Error fetching reports:", error);

            setLoading(false);

        });

    }, []);useEffect(() => {

               fetch("http://localhost:8080/students", {

                   headers: {

                       Authorization: `Bearer ${localStorage.getItem("token")}`

                   }

               })

               .then((response) => {

                   if (!response.ok) {
                       throw new Error("Failed to fetch students");
                   }

                   return response.json();

               })

               .then((data) => {

                   if (data.content) {
                       setStudents(data.content);
                   } else if (Array.isArray(data)) {
                       setStudents(data);
                   }

                   setLoading(false);

               })

               .catch((error) => {

                   console.error("Error fetching reports:", error);

                   setLoading(false);

               });

           }, []);useEffect(() => {

                      fetch("http://localhost:8080/students", {

                          headers: {

                              Authorization: `Bearer ${localStorage.getItem("token")}`

                          }

                      })

                      .then((response) => {

                          if (!response.ok) {
                              throw new Error("Failed to fetch students");
                          }

                          return response.json();

                      })

                      .then((data) => {

                          if (data.content) {
                              setStudents(data.content);
                          } else if (Array.isArray(data)) {
                              setStudents(data);
                          }

                          setLoading(false);

                      })

                      .catch((error) => {

                          console.error("Error fetching reports:", error);

                          setLoading(false);

                      });

                  }, []);


    // Department count

    const departmentCounts = students.reduce((result, student) => {

        const department = student.department || "Unknown";

        result[department] = (result[department] || 0) + 1;

        return result;

    }, {});


    // City count

    const cityCounts = students.reduce((result, student) => {

        const city = student.city || "Unknown";

        result[city] = (result[city] || 0) + 1;

        return result;

    }, {});


    if (loading) {

        return (

            <div className="reports-page">

                <h1>Reports</h1>

                <p>Loading reports...</p>

            </div>

        );

    }


    return (

        <div className="reports-page">

            <div className="reports-header">

                <div>

                    <p className="reports-label">
                        ANALYTICS
                    </p>

                    <h1>
                        Student Reports
                    </h1>

                    <p>
                        View student statistics and records.
                    </p>

                </div>

            </div>


            {/* SUMMARY CARDS */}

            <div className="report-stats">


                <div className="report-card">

                    <span className="report-icon">
                        👥
                    </span>

                    <div>

                        <p>
                            Total Students
                        </p>

                        <h2>
                            {students.length}
                        </h2>

                    </div>

                </div>


                <div className="report-card">

                    <span className="report-icon">
                        🎓
                    </span>

                    <div>

                        <p>
                            Departments
                        </p>

                        <h2>
                            {Object.keys(departmentCounts).length}
                        </h2>

                    </div>

                </div>


                <div className="report-card">

                    <span className="report-icon">
                        📍
                    </span>

                    <div>

                        <p>
                            Cities
                        </p>

                        <h2>
                            {Object.keys(cityCounts).length}
                        </h2>

                    </div>

                </div>


            </div>


            {/* DEPARTMENT REPORT */}

            <div className="report-section">

                <h2>
                    Students by Department
                </h2>


                <div className="report-list">

                    {Object.entries(departmentCounts).map(
                        ([department, count]) => (

                            <div
                                className="report-row"
                                key={department}
                            >

                                <span>
                                    {department}
                                </span>

                                <strong>
                                    {count}
                                </strong>

                            </div>

                        )
                    )}

                </div>

            </div>


            {/* CITY REPORT */}

            <div className="report-section">

                <h2>
                    Students by City
                </h2>


                <div className="report-list">

                    {Object.entries(cityCounts).map(
                        ([city, count]) => (

                            <div
                                className="report-row"
                                key={city}
                            >

                                <span>
                                    {city}
                                </span>

                                <strong>
                                    {count}
                                </strong>

                            </div>

                        )
                    )}

                </div>

            </div>


        </div>

    );

}

export default Reports;