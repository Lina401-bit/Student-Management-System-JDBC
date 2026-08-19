package com.example.StudentManagementAPI.controller;

import com.example.StudentManagementAPI.entity.User;
import com.example.StudentManagementAPI.service.AuditLogService;
import com.example.StudentManagementAPI.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/logout")
public class LogoutController {

    @Autowired
    private UserService userService;

    @Autowired
    private AuditLogService auditLogService;

    @PostMapping
    public ResponseEntity<String> logout(Authentication authentication) {

        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(401)
                    .body("User is not authenticated");
        }

        String username = authentication.getName();

        System.out.println("LOGOUT USER: " + username);

        User user = userService.getUserByUsername(username);

        if (user == null) {
            return ResponseEntity.status(404)
                    .body("User not found");
        }

        String role = "";

        if (user.getRole() != null) {
            role = user.getRole().getName();
        }

        auditLogService.log(
                user.getUsername(),
                role,
                "LOGOUT",
                "AUTH",
                String.valueOf(user.getId()),
                "User logged out successfully"
        );

        return ResponseEntity.ok("Logout Successful");
    }
}