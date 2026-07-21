package com.ems.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

@Entity
@Table(name = "attendance")
public class AttendanceRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "employee_id", nullable = false)
    @JsonIgnoreProperties({"tasks", "password"})
    private User employee;

    private String date; // Format: YYYY-MM-DD
    private String checkIn; // Format: HH:MM AM/PM
    private String checkOut; // Format: HH:MM AM/PM
    private double workingHours;
    private String dayType; // e.g. "Office", "Remote"
    private String status; // e.g. "On Time", "Late"

    public AttendanceRecord() {}

    public AttendanceRecord(User employee, String date, String checkIn, String checkOut, double workingHours, String dayType, String status) {
        this.employee = employee;
        this.date = date;
        this.checkIn = checkIn;
        this.checkOut = checkOut;
        this.workingHours = workingHours;
        this.dayType = dayType;
        this.status = status;
    }

    public static AttendanceRecordBuilder builder() {
        return new AttendanceRecordBuilder();
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getEmployee() { return employee; }
    public void setEmployee(User employee) { this.employee = employee; }

    public String getDate() { return date; }
    public void setDate(String date) { this.date = date; }

    public String getCheckIn() { return checkIn; }
    public void setCheckIn(String checkIn) { this.checkIn = checkIn; }

    public String getCheckOut() { return checkOut; }
    public void setCheckOut(String checkOut) { this.checkOut = checkOut; }

    public double getWorkingHours() { return workingHours; }
    public void setWorkingHours(double workingHours) { this.workingHours = workingHours; }

    public String getDayType() { return dayType; }
    public void setDayType(String dayType) { this.dayType = dayType; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    // Manual Builder
    public static class AttendanceRecordBuilder {
        private User employee;
        private String date;
        private String checkIn;
        private String checkOut;
        private double workingHours;
        private String dayType;
        private String status;

        public AttendanceRecordBuilder employee(User employee) { this.employee = employee; return this; }
        public AttendanceRecordBuilder date(String date) { this.date = date; return this; }
        public AttendanceRecordBuilder checkIn(String checkIn) { this.checkIn = checkIn; return this; }
        public AttendanceRecordBuilder checkOut(String checkOut) { this.checkOut = checkOut; return this; }
        public AttendanceRecordBuilder workingHours(double workingHours) { this.workingHours = workingHours; return this; }
        public AttendanceRecordBuilder dayType(String dayType) { this.dayType = dayType; return this; }
        public AttendanceRecordBuilder status(String status) { this.status = status; return this; }

        public AttendanceRecord build() {
            return new AttendanceRecord(employee, date, checkIn, checkOut, workingHours, dayType, status);
        }
    }
}
