package com.ems.controller;

import com.ems.model.Task;
import com.ems.model.User;
import com.ems.repository.TaskRepository;
import com.ems.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "*")
public class TaskController {

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public ResponseEntity<List<Task>> getAllTasks() {
        List<Task> tasks = taskRepository.findAll();
        return ResponseEntity.ok(tasks);
    }

    @PostMapping
    public ResponseEntity<?> createTask(@RequestBody CreateTaskRequest request) {
        Optional<User> employeeOpt = userRepository.findById(request.getEmployeeId());
        if (employeeOpt.isEmpty() || !"EMPLOYEE".equals(employeeOpt.get().getRole())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid employee ID.");
        }

        User employee = employeeOpt.get();

        Task task = Task.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .date(request.getDate())
                .category(request.getCategory())
                .status("NEW") // Default status
                .assignedEmployee(employee)
                .build();

        Task savedTask = taskRepository.save(task);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedTask);
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<?> updateTaskStatus(@PathVariable Long id, @RequestParam String status) {
        Optional<Task> taskOpt = taskRepository.findById(id);
        if (taskOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Task not found with ID: " + id);
        }

        Task task = taskOpt.get();
        String upperStatus = status.toUpperCase();

        if (!upperStatus.equals("NEW") && !upperStatus.equals("ACTIVE") && 
            !upperStatus.equals("COMPLETED") && !upperStatus.equals("FAILED")) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid status value.");
        }

        task.setStatus(upperStatus);
        Task updatedTask = taskRepository.save(task);
        return ResponseEntity.ok(updatedTask);
    }

    public static class CreateTaskRequest {
        private String title;
        private String description;
        private String date;
        private String category;
        private Long employeeId;

        public CreateTaskRequest() {}
        public CreateTaskRequest(String title, String description, String date, String category, Long employeeId) {
            this.title = title;
            this.description = description;
            this.date = date;
            this.category = category;
            this.employeeId = employeeId;
        }

        public String getTitle() { return title; }
        public void setTitle(String title) { this.title = title; }
        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }
        public String getDate() { return date; }
        public void setDate(String date) { this.date = date; }
        public String getCategory() { return category; }
        public void setCategory(String category) { this.category = category; }
        public Long getEmployeeId() { return employeeId; }
        public void setEmployeeId(Long employeeId) { this.employeeId = employeeId; }
    }
}
