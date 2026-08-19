package com.example.StudentManagementAPI.repository;

import com.example.StudentManagementAPI.entity.Role;

import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository
        extends JpaRepository<Role, Integer> {

}