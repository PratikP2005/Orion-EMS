package com.ems.config;

import com.ems.model.Task;
import com.ems.model.User;
import com.ems.model.LeaveApplication;
import com.ems.model.Payslip;
import com.ems.model.AttendanceRecord;
import com.ems.repository.TaskRepository;
import com.ems.repository.UserRepository;
import com.ems.repository.LeaveApplicationRepository;
import com.ems.repository.PayslipRepository;
import com.ems.repository.AttendanceRecordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private LeaveApplicationRepository leaveRepository;

    @Autowired
    private PayslipRepository payslipRepository;

    @Autowired
    private AttendanceRecordRepository attendanceRepository;

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.count() == 0) {
            System.out.println("Seeding database with default Admin account...");

            // 1. Create Admin
            User admin = User.builder()
                    .firstName("Arjun")
                    .lastName("Sharma")
                    .email("admin@me.com")
                    .password("123")
                    .role("ADMIN")
                    .position("Administrator")
                    .department("Management")
                    .bio("System administrator managing organization settings.")
                    .build();
            userRepository.save(admin);

            System.out.println("Default Admin account created successfully!");
        }
    }
}
