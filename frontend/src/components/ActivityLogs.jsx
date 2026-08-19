import React, { useEffect, useState } from "react";
import "../css/ActivityLogs.css";

function ActivityLogs() {

    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [search, setSearch] = useState("");
    const [actionFilter, setActionFilter] = useState("");
    const [roleFilter, setRoleFilter] = useState("");
    const [entityFilter, setEntityFilter] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const logsPerPage = 10;

    // ================================
    // FETCH AUDIT LOGS
    // ================================

    useEffect(() => {

        const fetchLogs = async () => {

            try {

                const token = localStorage.getItem("token");

                const response = await fetch(
                    "http://localhost:8080/audit-logs",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                if (!response.ok) {

                    if (response.status === 403) {

                        throw new Error(
                            "You do not have permission to view audit logs."
                        );

                    }

                    throw new Error(
                        "Failed to fetch audit logs"
                    );
                }

                const data = await response.json();

                setLogs(data);

            } catch (error) {

                console.error(
                    "Error fetching audit logs:",
                    error
                );

                setError(error.message);

            } finally {

                setLoading(false);

            }

        };

        fetchLogs();

    }, []);


    // ================================
    // FILTER LOGS
    // ================================

    const filteredLogs = logs.filter((log) => {

        const searchText =
            search.toLowerCase();

        const matchesSearch =
            log.username
                ?.toLowerCase()
                .includes(searchText) ||

            log.description
                ?.toLowerCase()
                .includes(searchText) ||

            log.entityId
                ?.toString()
                .includes(searchText);


        const matchesAction =
            actionFilter === "" ||
            log.action === actionFilter;


        const matchesRole =
            roleFilter === "" ||
            log.role
                ?.toLowerCase() ===
            roleFilter.toLowerCase();


        const matchesEntity =
            entityFilter === "" ||
            log.entityType === entityFilter;


        return (
            matchesSearch &&
            matchesAction &&
            matchesRole &&
            matchesEntity
        );

    });
// ================================
// PAGINATION
// ================================

const totalPages = Math.ceil(
    filteredLogs.length / logsPerPage
);

const startIndex =
    (currentPage - 1) * logsPerPage;

const endIndex =
    startIndex + logsPerPage;

const currentLogs =
    filteredLogs.slice(
        startIndex,
        endIndex
    );

    // ================================
    // CLEAR FILTERS
    // ================================

    const clearFilters = () => {

        setSearch("");
        setActionFilter("");
        setRoleFilter("");
        setEntityFilter("");

        setCurrentPage(1);

    };


    return (

        <div className="activity-logs-page">

            {/* =========================
                HEADER
            ========================== */}

            <div className="activity-header">

                <div>

                    <p className="section-label">
                        SYSTEM ACTIVITY
                    </p>

                    <h1>
                        Activity Logs
                    </h1>

                    <p>
                        Monitor user and system activities.
                    </p>

                </div>

            </div>


            {/* =========================
                FILTERS
            ========================== */}

            <div className="activity-filters">

                <input
                    type="text"
                    placeholder="Search username, description or ID..."
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setCurrentPage(1);
                    }}
                />


                <select
                    value={actionFilter}
                    onChange={(e) => {
                        setActionFilter(e.target.value);
                        setCurrentPage(1);
                    }}
                >

                    <option value="">
                        All Actions
                    </option>

                    <option value="LOGIN">
                        LOGIN
                    </option>

                    <option value="LOGOUT">
                        LOGOUT
                    </option>

                    <option value="REGISTRATION">
                        REGISTRATION
                    </option>

                    <option value="CREATE">
                        CREATE
                    </option>

                    <option value="UPDATE">
                        UPDATE
                    </option>

                    <option value="DELETE">
                        DELETE
                    </option>

                    <option value="PASSWORD_CHANGE">
                        PASSWORD CHANGE
                    </option>

                </select>


                <select
                    value={roleFilter}
                    onChange={(e) => {
                        setRoleFilter(e.target.value);
                        setCurrentPage(1);
                    }}
                >

                    <option value="">
                        All Roles
                    </option>

                    <option value="admin">
                        ADMIN
                    </option>

                    <option value="user">
                        USER
                    </option>

                </select>


                <select
                    value={entityFilter}
                    onChange={(e) => {
                        setEntityFilter(e.target.value);
                        setCurrentPage(1);
                    }}
                >

                    <option value="">
                        All Entities
                    </option>

                    <option value="AUTH">
                        AUTH
                    </option>

                    <option value="USER">
                        USER
                    </option>

                    <option value="STUDENT">
                        STUDENT
                    </option>

                </select>


                <button
                    className="clear-filter-btn"
                    onClick={clearFilters}
                >
                    Clear
                </button>

            </div>


            {/* =========================
                LOADING
            ========================== */}

            {loading && (

                <p className="activity-message">
                    Loading activity logs...
                </p>

            )}


            {/* =========================
                ERROR
            ========================== */}

            {error && (

                <p className="activity-error">
                    {error}
                </p>

            )}


            {/* =========================
                TABLE
            ========================== */}

            {!loading && !error && (

                <div className="activity-table-container">

                    <table className="activity-table">

                        <thead>

                            <tr>

                                <th>
                                    ID
                                </th>

                                <th>
                                    Username
                                </th>

                                <th>
                                    Role
                                </th>

                                <th>
                                    Action
                                </th>

                                <th>
                                    Entity
                                </th>

                                <th>
                                    Description
                                </th>

                                <th>
                                    Date & Time
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            {filteredLogs.length === 0 ? (

                                <tr>

                                    <td
                                        colSpan="7"
                                        className="no-logs"
                                    >
                                        No matching activity logs found.
                                    </td>

                                </tr>

                            ) : (

                                currentLogs.map((log) => (

                                    <tr key={log.id}>

                                        <td>
                                            {log.id}
                                        </td>


                                        <td>
                                            {log.username}
                                        </td>


                                        <td>

                                            <span className="role-badge">

                                                {log.role}

                                            </span>

                                        </td>


                                        <td>

                                            <span className="action-badge">

                                                {log.action}

                                            </span>

                                        </td>


                                        <td>

                                            {log.entityType}

                                            {log.entityId
                                                ? ` #${log.entityId}`
                                                : ""
                                            }

                                        </td>


                                        <td>
                                            {log.description}
                                        </td>


                                        <td>

                                            {new Date(
                                                log.timestamp
                                            ).toLocaleString()}

                                        </td>

                                    </tr>

                                ))

                            )}

                        </tbody>

                    </table>
{/* PAGINATION */}

{filteredLogs.length > 0 && (

    <div className="pagination-container">

        <div className="pagination-info">

            Showing{" "}
            {startIndex + 1}
            {" - "}
            {Math.min(
                endIndex,
                filteredLogs.length
            )}
            {" of "}
            {filteredLogs.length}

        </div>


        <div className="pagination-buttons">

            <button
                disabled={currentPage === 1}
                onClick={() =>
                    setCurrentPage(
                        currentPage - 1
                    )
                }
            >
                ← Previous
            </button>


            {Array.from(
                { length: totalPages },
                (_, index) => index + 1
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
                    {page}
                </button>

            ))}


            <button
                disabled={
                    currentPage === totalPages
                }
                onClick={() =>
                    setCurrentPage(
                        currentPage + 1
                    )
                }
            >
                Next →
            </button>

        </div>

    </div>

)}
                </div>

            )}

        </div>

    );

}

export default ActivityLogs;