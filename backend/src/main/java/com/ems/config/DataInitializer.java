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

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

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
        boolean forceReset = false; // Set to true to wipe and seed the database on this run
        
        if (forceReset || userRepository.count() == 0) {
            System.out.println("Clearing old data and seeding database with 20 Indian mock employees...");

            // Delete existing data to avoid duplicates
            attendanceRepository.deleteAll();
            payslipRepository.deleteAll();
            leaveRepository.deleteAll();
            taskRepository.deleteAll();
            userRepository.deleteAll();

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

            String[] firstNames = {"Aarav", "Vihaan", "Aditya", "Sai", "Krishna", "Ishaan", "Shaurya", "Atharva", "Kabir", "Rohan", "Ananya", "Diya", "Saanvi", "Myra", "Aadhya", "Kavya", "Navya", "Riya", "Ira", "Kiara"};
            String[] lastNames = {"Singh", "Patel", "Kumar", "Gupta", "Deshmukh", "Joshi", "Verma", "Reddy", "Mehta", "Bose", "Das", "Rao", "Nair", "Iyer", "Yadav", "Chauhan", "Bhat", "Thakur", "Menon", "Kapoor"};
            String[] positions = {"Frontend Developer", "Backend Developer", "DevOps Engineer", "QA Engineer", "Product Manager", "UI/UX Designer", "Data Analyst", "Marketing", "Sales Manager", "HR Specialist"};
            String[] departments = {"Engineering", "Engineering", "IT", "QA", "Product", "Design", "Data", "Marketing", "Sales", "HR"};
            
            List<User> employees = new ArrayList<>();
            Random random = new Random();

            for (int i = 0; i < 20; i++) {
                String fname = firstNames[i];
                String lname = lastNames[i];
                String email = fname.toLowerCase() + "." + lname.toLowerCase() + "@me.com";
                int posIndex = i % positions.length;

                User emp = User.builder()
                        .firstName(fname)
                        .lastName(lname)
                        .email(email)
                        .password("123")
                        .role("EMPLOYEE")
                        .position(positions[posIndex])
                        .department(departments[posIndex])
                        .bio("Passionate professional working in " + departments[posIndex] + ".")
                        .build();
                employees.add(userRepository.save(emp));
            }

            // Create some tasks, leaves, attendance, and payslips
            List<Task> tasks = new ArrayList<>();
            List<LeaveApplication> leaves = new ArrayList<>();
            List<AttendanceRecord> attendance = new ArrayList<>();
            List<Payslip> payslips = new ArrayList<>();
            
            String today = LocalDate.now().toString();
            String yesterday = LocalDate.now().minusDays(1).toString();

            for (int i = 0; i < employees.size(); i++) {
                User emp = employees.get(i);
                
                // Tasks (give a few random tasks)
                tasks.add(Task.builder()
                        .title("Review code for " + emp.getFirstName())
                        .description("Review the latest PRs.")
                        .status(i % 2 == 0 ? "IN_PROGRESS" : "TODO")
                        .category("Development")
                        .date("2026-08-01")
                        .assignedEmployee(emp)
                        .build());
                
                // Leaves (Only give leaves to first 5 employees to represent "a few leaves")
                if (i < 5) {
                    leaves.add(LeaveApplication.builder()
                            .employee(emp)
                            .type(i % 2 == 0 ? "Sick" : "Annual")
                            .dates("2026-08-10 to 2026-08-12")
                            .reason("Personal reasons")
                            .status(i % 3 == 0 ? "Pending" : "Approved")
                            .build());
                }

                // Attendance
                attendance.add(AttendanceRecord.builder()
                        .employee(emp)
                        .date(today)
                        .checkIn("09:00 AM")
                        .checkOut("05:30 PM")
                        .workingHours(8.5)
                        .status("Present")
                        .dayType("Office")
                        .build());

                // Payslips (1 payslip for each employee)
                double base = 50000 + (random.nextInt(10) * 5000);
                payslips.add(Payslip.builder()
                        .employee(emp)
                        .period("June 2026")
                        .basicSalary(base)
                        .allowances(base * 0.2)
                        .deductions(base * 0.05)
                        .netSalary(base + (base * 0.2) - (base * 0.05))
                        .build());
            }

            taskRepository.saveAll(tasks);
            leaveRepository.saveAll(leaves);
            attendanceRepository.saveAll(attendance);
            payslipRepository.saveAll(payslips);

            System.out.println("20 Indian mock employees seeded successfully!");
        }
    }
}
