package com.example.StudentManagementAPI.service;
import com.example.StudentManagementAPI.dto.ProfileRequest;
import com.example.StudentManagementAPI.entity.Role;
import com.example.StudentManagementAPI.entity.User;
import com.example.StudentManagementAPI.entity.UserStatus;
import com.example.StudentManagementAPI.repository.RoleRepository;
import com.example.StudentManagementAPI.repository.UserRepository;
import com.example.StudentManagementAPI.dto.ChangePasswordRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import com.example.StudentManagementAPI.entity.Student;
import com.example.StudentManagementAPI.repository.StudentRepository;
import java.time.LocalDateTime;

@Service
public class UserServiceImpl
        implements UserService {

    @Autowired
    private UserRepository repository;

    @Autowired
    private AuditLogService auditLogService;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private StudentRepository studentRepository;
    // =========================================
    // LOGIN
    // =========================================

    @Override
    public User login(

            String username,

            String password

    ) {


        User user =

                repository.findByUsername(

                        username

                );


        if (user == null) {

            return null;

        }


        if (

                !user.getPassword()

                        .equals(password)

        ) {

            return null;

        }


        return user;

    }

// =========================================
// GET USER BY USERNAME
// =========================================

    @Override
    public User getUserByUsername(

            String username

    ) {

        return repository.findByUsername(username);

    }



    @Override
    public User updateProfile(
            String username,
            ProfileRequest request
    ) {

        User user = repository.findByUsername(username);

        if (user == null) {
            throw new RuntimeException("User not found");
        }

        // =========================================
        // UPDATE USER PROFILE
        // =========================================

        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());
        user.setContactNumber(request.getContactNumber());
        user.setAddress(request.getAddress());
        user.setCourse(request.getCourse());

        User updatedUser = repository.save(user);


        // =========================================
        // UPDATE LINKED STUDENT
        // =========================================

        Student student = studentRepository
                .findByUser(user)
                .orElse(null);

        if (student != null) {

            student.setUpdatedBy(username);
            student.setUpdatedDate(LocalDateTime.now());

            studentRepository.save(student);


            // =========================================
            // AUDIT LOG - USER UPDATED OWN STUDENT
            // =========================================

            String role = "USER";

            if (user.getRole() != null) {
                role = user.getRole().getName();
            }

            auditLogService.log(
                    username,
                    role,
                    "UPDATE",
                    "STUDENT",
                    String.valueOf(student.getId()),
                    "Student \"" +
                            student.getName() +
                            "\" updated successfully"
            );
        }

        return updatedUser;
    }


    // =========================================
    // REGISTER
    // =========================================

    @Override
    public String register(

            User user

    ) {

        boolean adminExists = repository.existsByRole_Id(1);

        if (adminExists) {
            return "Registration is disabled. Admin already exists.";
        }
        User existingUser =

                repository.findByUsername(

                        user.getUsername()

                );


        if (existingUser != null) {

            return "Username already exists";

        }


        // Set ACTIVE status

        if (

                user.getStatus() == null

        ) {

            user.setStatus(

                    UserStatus.ACTIVE

            );

        }


        // =========================================
        // DEFAULT ROLE = USER
        // =========================================

        if (

                user.getRole() == null

        ) {


            Role defaultRole =

                    roleRepository

                            .findById(2)

                            .orElseThrow(

                                    () -> new RuntimeException(

                                            "User role not found"

                                    )

                            );


            user.setRole(

                    defaultRole

            );

        }


        User savedUser = repository.save(user);

        String role = "";

        if (savedUser.getRole() != null) {
            role = savedUser.getRole().getName();
        }

        auditLogService.log(
                savedUser.getUsername(),
                role,
                "REGISTRATION",
                "USER",
                String.valueOf(savedUser.getId()),
                "User registered successfully"
        );

        return "Registration Successful";

    }


    // =========================================
    // GET USERS
    // SEARCH + PAGINATION
    // SORTING + STATUS FILTER
    // =========================================

    @Override
    public Page<User> getUsers(

            String search,

            int page,

            int size,

            String sortBy,

            String direction,

            UserStatus status

    ) {


        Sort sort;


        if (

                direction.equalsIgnoreCase(

                        "desc"

                )

        ) {


            sort =

                    Sort.by(

                            sortBy

                    ).descending();


        } else {


            sort =

                    Sort.by(

                            sortBy

                    ).ascending();

        }


        Pageable pageable =

                PageRequest.of(

                        page,

                        size,

                        sort

                );


        // =========================================
        // SEARCH + STATUS
        // =========================================

        if (

                search != null

                        && !search.trim().isEmpty()

                        && status != null

        ) {


            return repository

                    .findByUsernameContainingIgnoreCaseAndStatus(

                            search,

                            status,

                            pageable

                    );

        }


        // =========================================
        // SEARCH ONLY
        // =========================================

        if (

                search != null

                        && !search.trim().isEmpty()

        ) {


            return repository

                    .findByUsernameContainingIgnoreCase(

                            search,

                            pageable

                    );

        }


        // =========================================
        // STATUS ONLY
        // =========================================

        if (status != null) {

            if (status == UserStatus.INACTIVE) {

                return repository.findByStatusAndIsDeletedTrue(
                        status,
                        pageable
                );

            }

            return repository.findByStatus(
                    status,
                    pageable
            );
        }


        // =========================================
        // ALL USERS
        // =========================================

        return repository.findByIsDeletedFalse(pageable);

    }


    // =========================================
    // GET USER BY ID
    // =========================================

    @Override
    public User getUserById(

            Integer id

    ) {


        return repository

                .findById(id)

                .orElseThrow(

                        () -> new RuntimeException(

                                "User not found with ID: "

                                        + id

                        )

                );

    }


    // =========================================
    // UPDATE USER
    // =========================================

    @Override
    public User updateUser(

            Integer id,

            User user

    ) {


        User existingUser =

                repository

                        .findById(id)

                        .orElseThrow(

                                () -> new RuntimeException(

                                        "User not found with ID: "

                                                + id

                                )

                        );


        existingUser.setUsername(

                user.getUsername()

        );


        existingUser.setPassword(

                user.getPassword()

        );


        if (

                user.getStatus() != null

        ) {


            existingUser.setStatus(

                    user.getStatus()

            );

        }


        if (

                user.getRole() != null

        ) {


            existingUser.setRole(

                    user.getRole()

            );

        }


        return repository.save(

                existingUser

        );

    }


    // =========================================
    // DELETE USER
    // =========================================

    @Override
    public void deleteUser(

            Integer id

    ) {


        User existingUser =

                repository

                        .findById(id)

                        .orElseThrow(

                                () -> new RuntimeException(

                                        "User not found with ID: "

                                                + id

                                )

                        );


        existingUser.setIsDeleted(true);
        existingUser.setStatus(UserStatus.INACTIVE);

        repository.save(existingUser);

    }@Override
    public void activateUser(Integer id) {

        User existingUser = repository
                .findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "User not found with ID: " + id
                        )
                );

        existingUser.setIsDeleted(false);
        existingUser.setStatus(UserStatus.ACTIVE);

        repository.save(existingUser);
    }
    @Override
    public User changePassword(
            String username,
            ChangePasswordRequest request
    ) {

        User user = repository.findByUsername(username);

        if (user == null) {
            throw new RuntimeException("User not found");
        }

        if (!user.getPassword().equals(request.getOldPassword())) {
            throw new RuntimeException("Old password is incorrect");
        }

        if (!request.getNewPassword()
                .equals(request.getConfirmPassword())) {

            throw new RuntimeException("Passwords do not match");
        }

        user.setPassword(request.getNewPassword());

        User updatedUser = repository.save(user);

        // ================================
        // PASSWORD CHANGE AUDIT LOG
        // ================================

        String role = "USER";

        if (user.getRole() != null) {
            role = user.getRole().getName();
        }

        auditLogService.log(
                username,
                role,
                "PASSWORD_CHANGE",
                "USER",
                String.valueOf(user.getId()),
                "Password changed successfully"
        );

        return updatedUser;
    }
}