package com.example.StudentManagementAPI.controller;

import com.example.StudentManagementAPI.entity.Student;
import com.example.StudentManagementAPI.service.StudentService;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/students")
@CrossOrigin(
        origins = "http://localhost:5173"
)
public class StudentController {


    @Autowired
    private StudentService service;


    // ================================
    // ADD STUDENT
    // ================================

    @PostMapping
    public ResponseEntity<Student> addStudent(

            @Valid
            @RequestBody
            Student student

    ) {

        Student savedStudent =
                service.addStudent(student);

        return ResponseEntity.ok(
                savedStudent
        );

    }


    // ================================
    // GET ALL STUDENTS
    // PAGINATION - 10 RECORDS
    // ================================

    @GetMapping
    public ResponseEntity<Page<Student>> getAllStudents(

            @RequestParam(
                    defaultValue = "0"
            )
            int page,

            @RequestParam(
                    defaultValue = "10"
            )
            int size

    ) {

        Pageable pageable =
                PageRequest.of(page, size);

        Page<Student> students =
                service.getAllStudents(pageable);

        return ResponseEntity.ok(
                students
        );

    }


    // ================================
    // GET STUDENT BY ID
    // ================================

    @GetMapping("/{id}")
    public ResponseEntity<Student> getStudentById(

            @PathVariable
            Integer id

    ) {

        Student student =
                service.getStudentById(id);

        return ResponseEntity.ok(
                student
        );

    }


    // ================================
    // UPDATE STUDENT
    // ================================

    @PutMapping("/{id}")
    public ResponseEntity<Student> updateStudent(

            @PathVariable
            Integer id,

            @Valid
            @RequestBody
            Student student

    ) {

        Student updatedStudent =
                service.updateStudent(
                        id,
                        student
                );

        return ResponseEntity.ok(
                updatedStudent
        );

    }


    // ================================
    // DELETE STUDENT
    // ================================

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteStudent(

            @PathVariable
            Integer id

    ) {

        service.deleteStudent(id);

        return ResponseEntity.ok(
                "Student deleted successfully"
        );

    }


    // ================================
    // SEARCH BY NAME
    // ================================

    @GetMapping("/search/name")
    public ResponseEntity<List<Student>> searchByName(

            @RequestParam
            String name

    ) {

        return ResponseEntity.ok(
                service.searchByName(name)
        );

    }


    // ================================
    // SEARCH BY EMAIL
    // ================================

    @GetMapping("/search/email")
    public ResponseEntity<List<Student>> searchByEmail(

            @RequestParam
            String email

    ) {

        return ResponseEntity.ok(
                service.searchByEmail(email)
        );

    }


    // ================================
    // FILTER BY DEPARTMENT
    // ================================

    @GetMapping("/filter/department")
    public ResponseEntity<List<Student>> filterByDepartment(

            @RequestParam
            String department

    ) {

        return ResponseEntity.ok(
                service.filterByDepartment(department)
        );

    }


    // ================================
    // FILTER BY CITY
    // ================================

    @GetMapping("/filter/city")
    public ResponseEntity<List<Student>> filterByCity(

            @RequestParam
            String city

    ) {

        return ResponseEntity.ok(
                service.filterByCity(city)
        );

    }


    // ================================
    // SEARCH + PAGINATION + SORTING
    // ================================

    @GetMapping("/page")
    public ResponseEntity<Page<Student>> getStudents(

            @RequestParam(
                    defaultValue = ""
            )
            String search,

            @RequestParam(
                    defaultValue = "0"
            )
            int page,

            @RequestParam(
                    defaultValue = "5"
            )
            int size,

            @RequestParam(
                    defaultValue = "id"
            )
            String sortBy,

            @RequestParam(
                    defaultValue = "asc"
            )
            String direction

    ) {

        Page<Student> students =
                service.getStudents(
                        search,
                        page,
                        size,
                        sortBy,
                        direction
                );

        return ResponseEntity.ok(
                students
        );

    }

}