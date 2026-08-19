package com.example.StudentManagementAPI.dto;

import com.example.StudentManagementAPI.entity.Role;
import com.example.StudentManagementAPI.entity.UserStatus;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ProfileResponse {

    private String username;
    private String fullName;
    private String email;
    private String contactNumber;
    private String address;
    private String course;
    private Role role;
    private UserStatus status;

}