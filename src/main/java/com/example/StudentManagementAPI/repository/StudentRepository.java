package com.example.StudentManagementAPI.repository;
import java.util.Optional;
import com.example.StudentManagementAPI.entity.User;
import com.example.StudentManagementAPI.entity.Student;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.StudentManagementAPI.repository.StudentRepository;
import java.util.List;

public interface StudentRepository
        extends JpaRepository<Student, Integer> {


    // ================================
    // SEARCH BY NAME
    // ================================

    List<Student> findByNameContainingIgnoreCase(
            String name
    );


    // ================================
    // SEARCH BY EMAIL
    // ================================

    List<Student> findByEmailContainingIgnoreCase(
            String email
    );


    // ================================
    // FILTER BY DEPARTMENT
    // ================================

    List<Student> findByDepartmentIgnoreCase(
            String department
    );
    List<Student> findByUserIsNullOrUserIsDeletedFalse();

    // ================================
    // FILTER BY CITY
    // ================================

    List<Student> findByCityIgnoreCase(
            String city
    );


    // ================================
    // SEARCH BY NAME
    // WITH PAGINATION
    // ================================

    Page<Student> findByNameContainingIgnoreCase(
            String name,
            Pageable pageable
    );


    // ================================
    // CHECK EMAIL ALREADY EXISTS
    // ================================

    boolean existsByEmail(
            String email
    );
    Optional<Student> findByUser(User user);
}