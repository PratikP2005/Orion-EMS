package com.ems.controller;

import com.ems.model.LeaveApplication;
import com.ems.model.User;
import com.ems.repository.LeaveApplicationRepository;
import com.ems.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/leaves")
@CrossOrigin(origins = "*")
public class LeaveController {

    @Autowired
    private LeaveApplicationRepository leaveRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public ResponseEntity<List<LeaveApplication>> getAllLeaves() {
        List<LeaveApplication> leaves = leaveRepository.findAll();
        return ResponseEntity.ok(leaves);
    }

    @GetMapping("/employee/{employeeId}")
    public ResponseEntity<List<LeaveApplication>> getEmployeeLeaves(@PathVariable Long employeeId) {
        List<LeaveApplication> leaves = leaveRepository.findByEmployeeId(employeeId);
        return ResponseEntity.ok(leaves);
    }

    @PostMapping
    public ResponseEntity<?> requestLeave(@RequestBody CreateLeaveRequest request) {
        if (request.getEmployeeId() == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Employee ID is required.");
        }

        Optional<User> employeeOpt = userRepository.findById(request.getEmployeeId());
        if (employeeOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid employee ID.");
        }

        LeaveApplication leave = LeaveApplication.builder()
                .employee(employeeOpt.get())
                .type(request.getType())
                .dates(request.getDates())
                .reason(request.getReason())
                .status("PENDING")
                .build();

        LeaveApplication savedLeave = leaveRepository.save(leave);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedLeave);
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<?> reviewLeave(@PathVariable Long id, @RequestParam String status) {
        Optional<LeaveApplication> leaveOpt = leaveRepository.findById(id);
        if (leaveOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Leave application not found.");
        }

        LeaveApplication leave = leaveOpt.get();
        String upperStatus = status.toUpperCase();

        if (!upperStatus.equals("PENDING") && !upperStatus.equals("APPROVED") && !upperStatus.equals("REJECTED")) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid status parameter.");
        }

        leave.setStatus(upperStatus);
        LeaveApplication updatedLeave = leaveRepository.save(leave);
        return ResponseEntity.ok(updatedLeave);
    }

    public static class CreateLeaveRequest {
        private Long employeeId;
        private String type;
        private String dates;
        private String reason;

        public CreateLeaveRequest() {}
        public CreateLeaveRequest(Long employeeId, String type, String dates, String reason) {
            this.employeeId = employeeId;
            this.type = type;
            this.dates = dates;
            this.reason = reason;
        }

        public Long getEmployeeId() { return employeeId; }
        public void setEmployeeId(Long employeeId) { this.employeeId = employeeId; }
        public String getType() { return type; }
        public void setType(String type) { this.type = type; }
        public String getDates() { return dates; }
        public void setDates(String dates) { this.dates = dates; }
        public String getReason() { return reason; }
        public void setReason(String reason) { this.reason = reason; }
    }
}
