package com.example.StudentManagementAPI.service;

import com.example.StudentManagementAPI.entity.AuditLog;

import java.util.List;

public interface AuditLogService {

    void log(
            String username,
            String role,
            String action,
            String entityType,
            String entityId,
            String description
    );

    List<AuditLog> getAllLogs();
}