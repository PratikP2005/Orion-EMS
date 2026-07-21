package com.ems.controller;

import com.ems.model.User;
import com.ems.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/employees")
@CrossOrigin(origins = "*")
public class EmployeeController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public ResponseEntity<List<User>> getAllEmployees() {
        List<User> employees = userRepository.findByRole("EMPLOYEE");
        return ResponseEntity.ok(employees);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getEmployeeById(@PathVariable Long id) {
        Optional<User> employeeOpt = userRepository.findById(id);
        if (employeeOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found with ID: " + id);
        }
        return ResponseEntity.ok(employeeOpt.get());
    }

    @PostMapping
    public ResponseEntity<?> createEmployee(@RequestBody CreateEmployeeRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email is already taken.");
        }

        User employee = User.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .password(request.getPassword() != null ? request.getPassword() : "123")
                .role(request.getRole() != null ? request.getRole().toUpperCase() : "EMPLOYEE")
                .phoneNumber(request.getPhoneNumber())
                .joinDate(request.getJoinDate())
                .bio(request.getBio())
                .department(request.getDepartment())
                .position(request.getPosition())
                .basicSalary(request.getBasicSalary())
                .allowances(request.getAllowances())
                .deductions(request.getDeductions())
                .build();

        User savedEmployee = userRepository.save(employee);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedEmployee);
    }

    @PutMapping("/{id}/profile")
    public ResponseEntity<?> updateProfile(@PathVariable Long id, @RequestBody UpdateProfileRequest request) {
        Optional<User> userOpt = userRepository.findById(id);
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
        }

        User user = userOpt.get();
        
        // Simple name parsing (split first space if Name field contains both)
        if (request.getName() != null && !request.getName().trim().isEmpty()) {
            String fullName = request.getName().trim();
            int firstSpace = fullName.indexOf(' ');
            if (firstSpace != -1) {
                user.setFirstName(fullName.substring(0, firstSpace));
                user.setLastName(fullName.substring(firstSpace + 1));
            } else {
                user.setFirstName(fullName);
                user.setLastName("");
            }
        }
        
        if (request.getPosition() != null) {
            user.setPosition(request.getPosition());
        }
        if (request.getBio() != null) {
            user.setBio(request.getBio());
        }

        User updatedUser = userRepository.save(user);
        return ResponseEntity.ok(updatedUser);
    }

    @PutMapping("/{id}/password")
    public ResponseEntity<?> updatePassword(@PathVariable Long id, @RequestBody UpdatePasswordRequest request) {
        Optional<User> userOpt = userRepository.findById(id);
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
        }

        User user = userOpt.get();
        if (!user.getPassword().equals(request.getOldPassword())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Incorrect current password.");
        }

        user.setPassword(request.getNewPassword());
        userRepository.save(user);
        return ResponseEntity.ok("Password updated successfully.");
    }

    public static class CreateEmployeeRequest {
        private String firstName;
        private String lastName;
        private String email;
        private String password;
        private String role;
        private String phoneNumber;
        private String joinDate;
        private String bio;
        private String department;
        private String position;
        private double basicSalary;
        private double allowances;
        private double deductions;

        public CreateEmployeeRequest() {}

        public String getFirstName() { return firstName; }
        public void setFirstName(String firstName) { this.firstName = firstName; }
        public String getLastName() { return lastName; }
        public void setLastName(String lastName) { this.lastName = lastName; }
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
        public String getRole() { return role; }
        public void setRole(String role) { this.role = role; }
        public String getPhoneNumber() { return phoneNumber; }
        public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }
        public String getJoinDate() { return joinDate; }
        public void setJoinDate(String joinDate) { this.joinDate = joinDate; }
        public String getBio() { return bio; }
        public void setBio(String bio) { this.bio = bio; }
        public String getDepartment() { return department; }
        public void setDepartment(String department) { this.department = department; }
        public String getPosition() { return position; }
        public void setPosition(String position) { this.position = position; }
        public double getBasicSalary() { return basicSalary; }
        public void setBasicSalary(double basicSalary) { this.basicSalary = basicSalary; }
        public double getAllowances() { return allowances; }
        public void setAllowances(double allowances) { this.allowances = allowances; }
        public double getDeductions() { return deductions; }
        public void setDeductions(double deductions) { this.deductions = deductions; }
    }

    public static class UpdateProfileRequest {
        private String name;
        private String position;
        private String bio;

        public UpdateProfileRequest() {}

        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        public String getPosition() { return position; }
        public void setPosition(String position) { this.position = position; }
        public String getBio() { return bio; }
        public void setBio(String bio) { this.bio = bio; }
    }

    public static class UpdatePasswordRequest {
        private String oldPassword;
        private String newPassword;

        public UpdatePasswordRequest() {}

        public String getOldPassword() { return oldPassword; }
        public void setOldPassword(String oldPassword) { this.oldPassword = oldPassword; }
        public String getNewPassword() { return newPassword; }
        public void setNewPassword(String newPassword) { this.newPassword = newPassword; }
    }
}
