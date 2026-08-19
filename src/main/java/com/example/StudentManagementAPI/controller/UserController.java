package com.example.StudentManagementAPI.controller;

import com.example.StudentManagementAPI.entity.User;
import com.example.StudentManagementAPI.entity.UserStatus;
import com.example.StudentManagementAPI.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;
import com.example.StudentManagementAPI.security.JwtUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService service;

    @Autowired
    private JwtUtil jwtUtil;
    // ================================
    // GET ALL USERS
    // ================================

    @GetMapping
    public Page<User> getUsers(

            @RequestParam(
                    defaultValue = ""
            )
            String search,


            @RequestParam(
                    defaultValue = "0"
            )
            int page,


            @RequestParam(
                    defaultValue = "10"
            )
            int size,


            @RequestParam(
                    defaultValue = "id"
            )
            String sortBy,


            @RequestParam(
                    defaultValue = "asc"
            )
            String direction,


            @RequestParam(
                    required = false
            )
            UserStatus status

    ) {

        return service.getUsers(

                search,

                page,

                size,

                sortBy,

                direction,

                status

        );

    }


    // ================================
    // GET USER BY ID
    // ================================

    @GetMapping("/{id}")
    public User getUserById(

            @PathVariable Integer id

    ) {

        return service.getUserById(id);

    }
// ================================
// GET LOGGED-IN USER PROFILE
// ================================

    @GetMapping("/profile")
    public ResponseEntity<User> getProfile(

            @RequestHeader("Authorization") String authHeader

    ) {

        String token = authHeader.substring(7);

        String username = jwtUtil.extractUsername(token);

        User user = service.getUserByUsername(username);

        if (user == null) {

            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .build();

        }

        return ResponseEntity.ok(user);

    }

    // ================================
    // UPDATE USER
    // ================================

    @PutMapping("/{id}")
    public User updateUser(

            @PathVariable Integer id,

            @RequestBody User user

    ) {

        return service.updateUser(

                id,

                user

        );

    }


    // ================================
    // DELETE USER
    // ================================

    @DeleteMapping("/{id}")
    public String deleteUser(

            @PathVariable Integer id

    ) {

        service.deleteUser(id);

        return "User deleted successfully";

    }@PutMapping("/{id}/activate")
    public String activateUser(@PathVariable Integer id) {

        service.activateUser(id);

        return "User activated successfully";
    }

}