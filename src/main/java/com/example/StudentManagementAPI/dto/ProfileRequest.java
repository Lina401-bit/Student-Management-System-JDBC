package com.example.StudentManagementAPI.dto;

import jakarta.validation.constraints.Pattern;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProfileRequest {

    private String fullName;

    private String email;

    @Pattern(
            regexp = "^[6-9][0-9]{9}$",
            message = "Contact number must be a valid 10-digit mobile number"
    )
    private String contactNumber;

    private String address;

    private String course;

}