import axios from "axios";

const API_URL = "http://localhost:8080/students";


// Get JWT token and attach it to request
const getAuthHeaders = () => {

    const token = localStorage.getItem("token");

    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

};


// ===============================
// GET ALL STUDENTS
// ===============================

export const getStudents = () => {

    return axios.get(
        API_URL,
        getAuthHeaders()
    );

};


// ===============================
// GET STUDENT BY ID
// ===============================

export const getStudentById = (id) => {

    return axios.get(
        `${API_URL}/${id}`,
        getAuthHeaders()
    );

};


// ===============================
// ADD STUDENT
// ===============================

export const addStudent = (student) => {

    return axios.post(
        API_URL,
        student,
        getAuthHeaders()
    );

};


// ===============================
// UPDATE STUDENT
// ===============================

export const updateStudent = (id, student) => {

    return axios.put(
        `${API_URL}/${id}`,
        student,
        getAuthHeaders()
    );

};


// ===============================
// DELETE STUDENT
// ===============================

export const deleteStudent = (id) => {

    return axios.delete(
        `${API_URL}/${id}`,
        getAuthHeaders()
    );

};