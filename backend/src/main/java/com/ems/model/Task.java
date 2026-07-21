package com.ems.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

@Entity
@Table(name = "tasks")
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(length = 1000)
    private String description;

    private String date; // Format: YYYY-MM-DD

    private String category;

    private String status; // "NEW", "ACTIVE", "COMPLETED", "FAILED"

    @ManyToOne
    @JoinColumn(name = "employee_id", nullable = false)
    @JsonIgnoreProperties("tasks")
    private User assignedEmployee;

    public Task() {}

    public Task(String title, String description, String date, String category, String status, User assignedEmployee) {
        this.title = title;
        this.description = description;
        this.date = date;
        this.category = category;
        this.status = status;
        this.assignedEmployee = assignedEmployee;
    }

    public static TaskBuilder builder() {
        return new TaskBuilder();
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getDate() { return date; }
    public void setDate(String date) { this.date = date; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public User getAssignedEmployee() { return assignedEmployee; }
    public void setAssignedEmployee(User assignedEmployee) { this.assignedEmployee = assignedEmployee; }

    // Manual Builder
    public static class TaskBuilder {
        private String title;
        private String description;
        private String date;
        private String category;
        private String status;
        private User assignedEmployee;

        public TaskBuilder title(String title) { this.title = title; return this; }
        public TaskBuilder description(String description) { this.description = description; return this; }
        public TaskBuilder date(String date) { this.date = date; return this; }
        public TaskBuilder category(String category) { this.category = category; return this; }
        public TaskBuilder status(String status) { this.status = status; return this; }
        public TaskBuilder assignedEmployee(User assignedEmployee) { this.assignedEmployee = assignedEmployee; return this; }

        public Task build() {
            return new Task(title, description, date, category, status, assignedEmployee);
        }
    }
}
