package com.ems.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstName;
    private String lastName;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    private String role; // "ADMIN" or "EMPLOYEE"

    private String phoneNumber;
    private String joinDate;
    
    @Column(length = 1000)
    private String bio;
    
    @Lob
    @Column(columnDefinition = "LONGTEXT")
    private String avatar;

    private String department;
    private String position;

    private double basicSalary;
    private double allowances;
    private double deductions;

    @OneToMany(mappedBy = "assignedEmployee", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JsonIgnoreProperties("assignedEmployee")
    private List<Task> tasks = new ArrayList<>();

    public User() {}

    public User(String firstName, String lastName, String email, String password, String role, 
                String phoneNumber, String joinDate, String bio, String department, String position,
                double basicSalary, double allowances, double deductions) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.role = role;
        this.phoneNumber = phoneNumber;
        this.joinDate = joinDate;
        this.bio = bio;
        this.department = department;
        this.position = position;
        this.basicSalary = basicSalary;
        this.allowances = allowances;
        this.deductions = deductions;
    }

    public static UserBuilder builder() {
        return new UserBuilder();
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

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

    public String getAvatar() { return avatar; }
    public void setAvatar(String avatar) { this.avatar = avatar; }

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

    public List<Task> getTasks() { return tasks; }
    public void setTasks(List<Task> tasks) { this.tasks = tasks; }

    // Manual Builder
    public static class UserBuilder {
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

        public UserBuilder firstName(String firstName) { this.firstName = firstName; return this; }
        public UserBuilder lastName(String lastName) { this.lastName = lastName; return this; }
        public UserBuilder email(String email) { this.email = email; return this; }
        public UserBuilder password(String password) { this.password = password; return this; }
        public UserBuilder role(String role) { this.role = role; return this; }
        public UserBuilder phoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; return this; }
        public UserBuilder joinDate(String joinDate) { this.joinDate = joinDate; return this; }
        public UserBuilder bio(String bio) { this.bio = bio; return this; }
        public UserBuilder department(String department) { this.department = department; return this; }
        public UserBuilder position(String position) { this.position = position; return this; }
        public UserBuilder basicSalary(double basicSalary) { this.basicSalary = basicSalary; return this; }
        public UserBuilder allowances(double allowances) { this.allowances = allowances; return this; }
        public UserBuilder deductions(double deductions) { this.deductions = deductions; return this; }

        public User build() {
            return new User(firstName, lastName, email, password, role, 
                            phoneNumber, joinDate, bio, department, position,
                            basicSalary, allowances, deductions);
        }
    }
}
