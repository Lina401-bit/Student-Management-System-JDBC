package com.example.StudentManagementAPI.repository;
import java.util.List;
import com.example.StudentManagementAPI.entity.User;
import com.example.StudentManagementAPI.entity.UserStatus;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository
        extends JpaRepository<User, Integer> {

    List<User> findByIsDeletedFalse();
    // LOGIN
    Page<User> findByIsDeletedFalse(Pageable pageable);

    User findByUsername(
            String username
    );


    // CHECK IF ADMIN EXISTS

    boolean existsByRole_Id(
            Integer roleId
    );


    // SEARCH BY USERNAME

    Page<User> findByUsernameContainingIgnoreCase(

            String username,

            Pageable pageable

    );


    // FILTER BY STATUS

    Page<User> findByStatus(

            UserStatus status,

            Pageable pageable

    );
    Page<User> findByStatusAndIsDeletedTrue(
            UserStatus status,
            Pageable pageable
    );

    // SEARCH + FILTER BY STATUS

    Page<User>
    findByUsernameContainingIgnoreCaseAndStatus(

            String username,

            UserStatus status,

            Pageable pageable

    );

}