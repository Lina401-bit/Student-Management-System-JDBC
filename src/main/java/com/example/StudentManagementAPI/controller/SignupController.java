package com.example.StudentManagementAPI.controller;

import com.example.StudentManagementAPI.entity.User;
import com.example.StudentManagementAPI.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/signup")
public class SignupController {

    @Autowired
    private UserService service;

    @PostMapping
    public String signup(@RequestBody User user) {

        return service.register(user);

    }
}