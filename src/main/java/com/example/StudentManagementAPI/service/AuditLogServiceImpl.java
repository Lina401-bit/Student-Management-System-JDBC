package com.example.StudentManagementAPI.service;

import com.example.StudentManagementAPI.entity.AuditLog;
import com.example.StudentManagementAPI.repository.AuditLogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Sort;
import java.util.List;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class AuditLogServiceImpl implements AuditLogService {

    private final AuditLogRepository auditLogRepository;

    @Override
    public void log(
            String username,
            String role,
            String action,
            String entityType,
            String entityId,
            String description
    ) {

        AuditLog auditLog = new AuditLog();

        auditLog.setUsername(username);
        auditLog.setRole(role);
        auditLog.setAction(action);
        auditLog.setEntityType(entityType);
        auditLog.setEntityId(entityId);
        auditLog.setDescription(description);
        auditLog.setTimestamp(LocalDateTime.now());

        auditLogRepository.save(auditLog);
    }
    @Override
    public List<AuditLog> getAllLogs() {

        return auditLogRepository.findAll(
                Sort.by(
                        Sort.Direction.DESC,
                        "timestamp"
                )
        );
    }
}