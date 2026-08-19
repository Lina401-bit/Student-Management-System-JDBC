package com.example.StudentManagementAPI.service;

import com.example.StudentManagementAPI.entity.Student;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.List;

public interface StudentService {


    // ================================
    // ADD STUDENT
    // ================================

    Student addStudent(Student student);


    // ================================
    // GET ALL STUDENTS
    // ================================

    Page<Student> getAllStudents(Pageable pageable);


    // ================================
    // GET STUDENT BY ID
    // ================================

    Student getStudentById(Integer id);


    // ================================
    // UPDATE STUDENT
    // ================================

    Student updateStudent(
            Integer id,
            Student student
    );


    // ================================
    // DELETE STUDENT
    // ================================

    void deleteStudent(Integer id);


    // ================================
    // SEARCH BY NAME
    // ================================

    List<Student> searchByName(String name);


    // ================================
    // SEARCH BY EMAIL
    // ================================

    List<Student> searchByEmail(String email);


    // ================================
    // FILTER BY DEPARTMENT
    // ================================

    List<Student> filterByDepartment(
            String department
    );


    // ================================
    // FILTER BY CITY
    // ================================

    List<Student> filterByCity(
            String city
    );


    // ================================
    // SEARCH + PAGINATION + SORTING
    // ================================

    Page<Student> getStudents(

            String search,

            int page,

            int size,

            String sortBy,

            String direction

    );

}