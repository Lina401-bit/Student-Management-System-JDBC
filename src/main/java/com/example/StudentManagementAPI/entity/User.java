package com.example.StudentManagementAPI.entity;
import jakarta.persistence.Column;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.*;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    // Username
    private String username;

    // Password
    private String password;

    // Full Name
    private String fullName;

    // Email
    private String email;

    // Contact Number
    @NotBlank(message = "Contact number is required")
    @Pattern(
            regexp = "^[6-9][0-9]{9}$",
            message = "Contact number must be a valid 10-digit Indian mobile number"
    )
    private String contactNumber;

    // Address
    private String address;

    // Course
    private String course;
    @ManyToOne
    @JoinColumn(name = "role_id")
    private Role role;


    // User Status

    @Enumerated(EnumType.STRING)
    private UserStatus status;
    @Column(name = "is_deleted")
    private Boolean isDeleted = false;

}