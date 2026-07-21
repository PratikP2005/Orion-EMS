package com.ems.controller;

import com.ems.model.AttendanceRecord;
import com.ems.model.User;
import com.ems.repository.AttendanceRecordRepository;
import com.ems.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/attendance")
@CrossOrigin(origins = "*")
public class AttendanceController {

    @Autowired
    private AttendanceRecordRepository attendanceRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/employee/{employeeId}")
    public ResponseEntity<List<AttendanceRecord>> getEmployeeAttendance(@PathVariable Long employeeId) {
        List<AttendanceRecord> records = attendanceRepository.findByEmployeeId(employeeId);
        return ResponseEntity.ok(records);
    }

    @PostMapping("/clock-in")
    public ResponseEntity<?> clockIn(@RequestBody ClockInRequest request) {
        Optional<User> employeeOpt = userRepository.findById(request.getEmployeeId());
        if (employeeOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid employee ID.");
        }

        Optional<AttendanceRecord> existingOpt = attendanceRepository
                .findByEmployeeIdAndDate(request.getEmployeeId(), request.getDate());
        if (existingOpt.isPresent()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Already clocked in for today.");
        }

        // Determine status (Late if check-in is after 09:15 AM)
        String status = "On Time";
        try {
            int minutes = parseTimeToMinutes(request.getCheckIn());
            int threshold = 9 * 60 + 15; // 09:15 AM
            if (minutes > threshold) {
                status = "Late";
            }
        } catch (Exception e) {
            // Keep "On Time" if format parse fails
        }

        AttendanceRecord record = AttendanceRecord.builder()
                .employee(employeeOpt.get())
                .date(request.getDate())
                .checkIn(request.getCheckIn())
                .dayType(request.getDayType() != null ? request.getDayType() : "Office")
                .status(status)
                .workingHours(0) // 0 until clock-out
                .build();

        AttendanceRecord savedRecord = attendanceRepository.save(record);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedRecord);
    }

    @PostMapping("/clock-out")
    public ResponseEntity<?> clockOut(@RequestBody ClockOutRequest request) {
        Optional<AttendanceRecord> recordOpt = attendanceRepository
                .findByEmployeeIdAndDate(request.getEmployeeId(), request.getDate());
        if (recordOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No clock-in record found for today.");
        }

        AttendanceRecord record = recordOpt.get();
        if (record.getCheckOut() != null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Already clocked out for today.");
        }

        record.setCheckOut(request.getCheckOut());
        double hours = calculateWorkingHours(record.getCheckIn(), request.getCheckOut());
        
        // Round to 1 decimal place
        record.setWorkingHours(Math.round(hours * 10.0) / 10.0);

        AttendanceRecord savedRecord = attendanceRepository.save(record);
        return ResponseEntity.ok(savedRecord);
    }

    private double calculateWorkingHours(String in, String out) {
        try {
            int minutesIn = parseTimeToMinutes(in);
            int minutesOut = parseTimeToMinutes(out);
            int diff = minutesOut - minutesIn;
            if (diff < 0) diff += 24 * 60; // Cross-midnight buffer
            return (double) diff / 60.0;
        } catch (Exception e) {
            return 8.5; // Default standard hours
        }
    }

    private int parseTimeToMinutes(String time) {
        // Parse "09:30 AM" or "05:30 PM"
        String[] parts = time.trim().split(" ");
        String[] hm = parts[0].split(":");
        int h = Integer.parseInt(hm[0]);
        int m = Integer.parseInt(hm[1]);
        String ampm = parts[1].toUpperCase();
        if (ampm.equals("PM") && h != 12) h += 12;
        if (ampm.equals("AM") && h == 12) h = 0;
        return h * 60 + m;
    }

    public static class ClockInRequest {
        private Long employeeId;
        private String date;
        private String checkIn;
        private String dayType;

        public ClockInRequest() {}
        public ClockInRequest(Long employeeId, String date, String checkIn, String dayType) {
            this.employeeId = employeeId;
            this.date = date;
            this.checkIn = checkIn;
            this.dayType = dayType;
        }

        public Long getEmployeeId() { return employeeId; }
        public void setEmployeeId(Long employeeId) { this.employeeId = employeeId; }
        public String getDate() { return date; }
        public void setDate(String date) { this.date = date; }
        public String getCheckIn() { return checkIn; }
        public void setCheckIn(String checkIn) { this.checkIn = checkIn; }
        public String getDayType() { return dayType; }
        public void setDayType(String dayType) { this.dayType = dayType; }
    }

    public static class ClockOutRequest {
        private Long employeeId;
        private String date;
        private String checkOut;

        public ClockOutRequest() {}
        public ClockOutRequest(Long employeeId, String date, String checkOut) {
            this.employeeId = employeeId;
            this.date = date;
            this.checkOut = checkOut;
        }

        public Long getEmployeeId() { return employeeId; }
        public void setEmployeeId(Long employeeId) { this.employeeId = employeeId; }
        public String getDate() { return date; }
        public void setDate(String date) { this.date = date; }
        public String getCheckOut() { return checkOut; }
        public void setCheckOut(String checkOut) { this.checkOut = checkOut; }
    }
}
