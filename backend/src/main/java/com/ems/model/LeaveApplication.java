package com.ems.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

@Entity
@Table(name = "leaves")
public class LeaveApplication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "employee_id", nullable = false)
    @JsonIgnoreProperties({"tasks", "password"})
    private User employee;

    private String type; // e.g. "Sick Leave", "Casual Leave", "Annual Leave"
    private String dates; // e.g. "2026-07-22 to 2026-07-25"
    
    @Column(length = 1000)
    private String reason;
    
    private String status; // "PENDING", "APPROVED", "REJECTED"

    public LeaveApplication() {}

    public LeaveApplication(User employee, String type, String dates, String reason, String status) {
        this.employee = employee;
        this.type = type;
        this.dates = dates;
        this.reason = reason;
        this.status = status;
    }

    public static LeaveApplicationBuilder builder() {
        return new LeaveApplicationBuilder();
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getEmployee() { return employee; }
    public void setEmployee(User employee) { this.employee = employee; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public String getDates() { return dates; }
    public void setDates(String dates) { this.dates = dates; }

    public String getReason() { return reason; }
    public void setReason(String reason) { this.reason = reason; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    // Manual Builder
    public static class LeaveApplicationBuilder {
        private User employee;
        private String type;
        private String dates;
        private String reason;
        private String status;

        public LeaveApplicationBuilder employee(User employee) { this.employee = employee; return this; }
        public LeaveApplicationBuilder type(String type) { this.type = type; return this; }
        public LeaveApplicationBuilder dates(String dates) { this.dates = dates; return this; }
        public LeaveApplicationBuilder reason(String reason) { this.reason = reason; return this; }
        public LeaveApplicationBuilder status(String status) { this.status = status; return this; }

        public LeaveApplication build() {
            return new LeaveApplication(employee, type, dates, reason, status);
        }
    }
}
