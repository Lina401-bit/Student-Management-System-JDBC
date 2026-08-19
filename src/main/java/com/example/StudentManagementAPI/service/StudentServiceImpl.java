package com.example.StudentManagementAPI.service;

import com.example.StudentManagementAPI.entity.Student;
import com.example.StudentManagementAPI.repository.StudentRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import com.example.StudentManagementAPI.entity.User;
import com.example.StudentManagementAPI.entity.Role;
import com.example.StudentManagementAPI.entity.UserStatus;
import com.example.StudentManagementAPI.repository.UserRepository;
import com.example.StudentManagementAPI.repository.RoleRepository;

import java.util.List;


@Service
public class StudentServiceImpl
        implements StudentService {


    @Autowired
    private StudentRepository studentRepository;


    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuditLogService auditLogService;

    @Autowired
    private RoleRepository roleRepository;
    // ================================
    // ADD STUDENT
    // ================================


    @Override
    public Student addStudent(Student student) {


        // ================================
        // CREATE USER ACCOUNT
        // ================================


        User user = new User();


        // Username from email
        user.setUsername(
                student.getEmail()
                        .split("@")[0]
        );


        // Default password
        user.setPassword(
                "123456"
        );


        user.setEmail(
                student.getEmail()
        );


        user.setFullName(
                student.getName()
        );


        user.setStatus(
                UserStatus.ACTIVE
        );


        // Assign USER role
        Role userRole =

                roleRepository.findById(2)

                        .orElseThrow(

                                () -> new RuntimeException(
                                        "USER role not found"
                                )

                        );


        user.setRole(userRole);



        // Save user first
        User savedUser =
                userRepository.save(user);



        // ================================
        // CONNECT USER WITH STUDENT
        // ================================


        student.setUser(savedUser);



        // Save student
        Student savedStudent = studentRepository.save(student);

        String username = "SYSTEM";
        String role = "ADMIN";

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        if (authentication != null &&
                authentication.isAuthenticated()) {

            username = authentication.getName();

            if (authentication.getAuthorities() != null &&
                    !authentication.getAuthorities().isEmpty()) {

                role = authentication.getAuthorities()
                        .iterator()
                        .next()
                        .getAuthority()
                        .replace("ROLE_", "");
            }
        }

        auditLogService.log(
                username,
                role,
                "CREATE",
                "STUDENT",
                String.valueOf(savedStudent.getId()),
                "Student created successfully"
        );

        return savedStudent;

    }


    // ================================
    // GET ALL STUDENTS
    // ================================

    @Override
    public Page<Student> getAllStudents(Pageable pageable) {

        return studentRepository.findAll(pageable);

    }


    // ================================
    // GET STUDENT BY ID
    // ================================

    @Override
    public Student getStudentById(
            Integer id
    ) {

        return studentRepository.findById(id)

                .orElseThrow(

                        () -> new RuntimeException(

                                "Student not found with ID: "
                                        + id

                        )

                );

    }


    // ================================
    // UPDATE STUDENT
    // ================================

    @Override
    public Student updateStudent(

            Integer id,

            Student student

    ) {

        Student existingStudent =

                studentRepository.findById(id)

                        .orElseThrow(

                                () -> new RuntimeException(

                                        "Student not found with ID: "
                                                + id

                                )

                        );


        existingStudent.setName(
                student.getName()
        );


        existingStudent.setEmail(
                student.getEmail()
        );


        existingStudent.setDepartment(
                student.getDepartment()
        );


        existingStudent.setCity(
                student.getCity()
        );


        Student updatedStudent = studentRepository.save(existingStudent);

        String username = "SYSTEM";
        String role = "ADMIN";

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        if (authentication != null &&
                authentication.isAuthenticated()) {

            username = authentication.getName();

            if (authentication.getAuthorities() != null &&
                    !authentication.getAuthorities().isEmpty()) {

                role = authentication.getAuthorities()
                        .iterator()
                        .next()
                        .getAuthority()
                        .replace("ROLE_", "");
            }
        }
        System.out.println(
                "UPDATE AUDIT: "
                        + username
                        + " | "
                        + role
                        + " | "
                        + updatedStudent.getId()
        );
        auditLogService.log(
                username,
                role,
                "UPDATE",
                "STUDENT",
                String.valueOf(updatedStudent.getId()),
                "Student updated successfully"
        );

        return updatedStudent;
    }


    // ================================
    // DELETE STUDENT
    // ================================
    @Override
    public void deleteStudent(Integer id) {

        Student existingStudent = studentRepository
                .findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Student not found with ID: " + id
                        )
                );

        User user = existingStudent.getUser();

        System.out.println("Linked User: " + user);

        if (user != null) {

            user.setIsDeleted(true);
            user.setStatus(UserStatus.INACTIVE);

            // Save the linked user
            userRepository.save(user);

            // ================================
            // DELETE AUDIT LOG
            // ================================

            Authentication authentication =
                    SecurityContextHolder
                            .getContext()
                            .getAuthentication();

            String username =
                    authentication != null
                            ? authentication.getName()
                            : "SYSTEM";

            String role =
                    authentication != null
                            && authentication.getAuthorities() != null
                            && !authentication.getAuthorities().isEmpty()
                            ? authentication.getAuthorities()
                            .iterator()
                            .next()
                            .getAuthority()
                            : "SYSTEM";

            if (role.startsWith("ROLE_")) {
                role = role.substring(5);
            }
            System.out.println("========== DELETE AUDIT ==========");
            System.out.println("Username: " + username);
            System.out.println("Role: " + role);
            System.out.println("Student ID: " + id);
            System.out.println("==================================");
            auditLogService.log(
                    username,
                    role,
                    "DELETE",
                    "STUDENT",
                    String.valueOf(id),
                    "Student deleted successfully"
            );
        }
    }
    // ================================
    // SEARCH BY NAME
    // ================================

    @Override
    public List<Student> searchByName(
            String name
    ) {

        return studentRepository

                .findByNameContainingIgnoreCase(
                        name
                );

    }


    // ================================
    // SEARCH BY EMAIL
    // ================================

    @Override
    public List<Student> searchByEmail(
            String email
    ) {

        return studentRepository

                .findByEmailContainingIgnoreCase(
                        email
                );

    }


    // ================================
    // FILTER BY DEPARTMENT
    // ================================

    @Override
    public List<Student> filterByDepartment(

            String department

    ) {

        return studentRepository

                .findByDepartmentIgnoreCase(
                        department
                );

    }


    // ================================
    // FILTER BY CITY
    // ================================

    @Override
    public List<Student> filterByCity(

            String city

    ) {

        return studentRepository

                .findByCityIgnoreCase(
                        city
                );

    }


    // ================================
    // SEARCH + PAGINATION + SORTING
    // ================================

    @Override
    public Page<Student> getStudents(

            String search,

            int page,

            int size,

            String sortBy,

            String direction

    ) {


        // -----------------------------
        // SORTING
        // -----------------------------

        Sort sort;


        if (

                direction != null

                        && direction.equalsIgnoreCase(
                        "desc"
                )

        ) {

            sort = Sort.by(
                    sortBy
            ).descending();

        } else {

            sort = Sort.by(
                    sortBy
            ).ascending();

        }


        // -----------------------------
        // PAGINATION
        // -----------------------------

        Pageable pageable =

                PageRequest.of(

                        page,

                        size,

                        sort

                );


        // -----------------------------
        // SEARCH + PAGINATION
        // -----------------------------

        if (

                search == null

                        || search.trim().isEmpty()

        ) {

            return studentRepository

                    .findAll(
                            pageable
                    );

        }


        return studentRepository

                .findByNameContainingIgnoreCase(

                        search,

                        pageable

                );

    }

}