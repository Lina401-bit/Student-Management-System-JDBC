package com.example.StudentManagementAPI.repository;

import com.example.StudentManagementAPI.entity.AuditLog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuditLogRepository
        extends JpaRepository<AuditLog, Long> {
}