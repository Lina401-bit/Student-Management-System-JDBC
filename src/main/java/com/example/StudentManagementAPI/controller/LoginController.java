package com.example.StudentManagementAPI.controller;

import com.example.StudentManagementAPI.dto.LoginResponse;
import com.example.StudentManagementAPI.entity.User;
import com.example.StudentManagementAPI.security.JwtUtil;
import com.example.StudentManagementAPI.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.StudentManagementAPI.service.AuditLogService;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class LoginController {


    @Autowired
    private UserService userService;


    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private AuditLogService auditLogService;
    // =========================================
    // LOGIN
    // =========================================

    @PostMapping("/login")
    public ResponseEntity<?> login(

            @RequestParam String username,

            @RequestParam String password

    ) {


        User user = userService.login(
                username,
                password
        );


        // INVALID LOGIN

        if (user == null) {

            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body("Invalid Username or Password");

        }


        // GENERATE JWT TOKEN

        // GENERATE JWT TOKEN

        String role = "";

        if (user.getRole() != null) {
            role = user.getRole().getName();
        }

        String token = jwtUtil.generateToken(
                user.getUsername(),
                role
        );
        auditLogService.log(
                user.getUsername(),
                role,
                "LOGIN",
                "AUTH",
                String.valueOf(user.getId()),
                "User logged in successfully"
        );

// SAVE LOGIN AUDIT LOG



// LOGIN RESPONSE

        LoginResponse response = new LoginResponse(
                token,
                user.getUsername(),
                role
        );

        return ResponseEntity.ok(response);
    }
}