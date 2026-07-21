package com.ems.repository;

import com.ems.model.AttendanceRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface AttendanceRecordRepository extends JpaRepository<AttendanceRecord, Long> {
    List<AttendanceRecord> findByEmployeeId(Long employeeId);
    Optional<AttendanceRecord> findByEmployeeIdAndDate(Long employeeId, String date);
}
