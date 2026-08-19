package com.example.StudentManagementAPI.controller;

import com.example.StudentManagementAPI.entity.User;
import com.example.StudentManagementAPI.security.JwtUtil;
import com.example.StudentManagementAPI.service.UserService;
import com.example.StudentManagementAPI.dto.ProfileResponse;
import com.example.StudentManagementAPI.dto.ProfileRequest;
import com.example.StudentManagementAPI.dto.ChangePasswordRequest;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/profile")
@CrossOrigin(origins = "http://localhost:5173")
public class ProfileController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;


    // ================================
    // GET PROFILE
    // ================================

    @GetMapping
    public ResponseEntity<?> getProfile(
            @RequestHeader("Authorization") String token) {

        token = token.replace("Bearer ", "");

        String username =
                jwtUtil.extractUsername(token);

        User user =
                userService.getUserByUsername(username);

        if (user == null) {
            return ResponseEntity.notFound().build();
        }

        ProfileResponse profile =
                new ProfileResponse(
                        user.getUsername(),
                        user.getFullName(),
                        user.getEmail(),
                        user.getContactNumber(),
                        user.getAddress(),
                        user.getCourse(),
                        user.getRole(),
                        user.getStatus()
                );

        return ResponseEntity.ok(profile);
    }


    // ================================
    // UPDATE PROFILE
    // ================================

    @PutMapping("/update")
    public ResponseEntity<?> updateProfile(

            @RequestHeader("Authorization")
            String token,

            @Valid
            @RequestBody
            ProfileRequest request

    ) {

        token = token.replace("Bearer ", "");

        String username =
                jwtUtil.extractUsername(token);

        User updatedUser =
                userService.updateProfile(
                        username,
                        request
                );

        return ResponseEntity.ok(updatedUser);
    }


    // ================================
    // CHANGE PASSWORD
    // ================================

    @PutMapping("/change-password")
    public ResponseEntity<?> changePassword(

            @RequestHeader("Authorization")
            String token,

            @RequestBody
            ChangePasswordRequest request

    ) {

        token = token.replace("Bearer ", "");

        String username =
                jwtUtil.extractUsername(token);

        User user =
                userService.changePassword(
                        username,
                        request
                );

        return ResponseEntity.ok(
                "Password changed successfully"
        );
    }

}