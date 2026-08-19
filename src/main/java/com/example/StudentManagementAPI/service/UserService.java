package com.example.StudentManagementAPI.service;
import com.example.StudentManagementAPI.dto.ProfileRequest;
import com.example.StudentManagementAPI.entity.User;
import com.example.StudentManagementAPI.entity.UserStatus;
import com.example.StudentManagementAPI.dto.ChangePasswordRequest;
import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.data.domain.Page;

public interface UserService {


    // =========================================
    // LOGIN
    // =========================================

    User login(

            String username,

            String password

    );
    User getUserByUsername(
            String username
    );
    User updateProfile(
            String username,
            ProfileRequest request
    );

    // =========================================
    // REGISTER
    // =========================================

    String register(

            User user

    );


    // =========================================
    // GET USERS
    // SEARCH + PAGINATION
    // SORTING + STATUS FILTER
    // =========================================

    Page<User> getUsers(

            String search,

            int page,

            int size,

            String sortBy,

            String direction,

            UserStatus status

    );


    // =========================================
    // GET USER BY ID
    // =========================================

    User getUserById(

            Integer id

    );


    // =========================================
    // UPDATE USER
    // =========================================

    User updateUser(

            Integer id,

            User user

    );


    // =========================================
    // DELETE USER
    // =========================================

    void deleteUser(

            Integer id

    );
    void activateUser(Integer id);
    User changePassword(
            String username,
            ChangePasswordRequest request
    );

}