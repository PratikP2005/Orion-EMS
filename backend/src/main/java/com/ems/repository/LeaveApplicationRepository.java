package com.ems.repository;

import com.ems.model.LeaveApplication;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface LeaveApplicationRepository extends JpaRepository<LeaveApplication, Long> {
    List<LeaveApplication> findByEmployeeId(Long employeeId);
}
