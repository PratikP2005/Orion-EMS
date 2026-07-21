package com.ems.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

@Entity
@Table(name = "payslips")
public class Payslip {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "employee_id", nullable = false)
    @JsonIgnoreProperties({"tasks", "password"})
    private User employee;

    private String period; // e.g. "February 2026"
    private double basicSalary;
    private double allowances;
    private double deductions;
    private double netSalary;

    public Payslip() {}

    public Payslip(User employee, String period, double basicSalary, double allowances, double deductions, double netSalary) {
        this.employee = employee;
        this.period = period;
        this.basicSalary = basicSalary;
        this.allowances = allowances;
        this.deductions = deductions;
        this.netSalary = netSalary;
    }

    public static PayslipBuilder builder() {
        return new PayslipBuilder();
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getEmployee() { return employee; }
    public void setEmployee(User employee) { this.employee = employee; }

    public String getPeriod() { return period; }
    public void setPeriod(String period) { this.period = period; }

    public double getBasicSalary() { return basicSalary; }
    public void setBasicSalary(double basicSalary) { this.basicSalary = basicSalary; }

    public double getAllowances() { return allowances; }
    public void setAllowances(double allowances) { this.allowances = allowances; }

    public double getDeductions() { return deductions; }
    public void setDeductions(double deductions) { this.deductions = deductions; }

    public double getNetSalary() { return netSalary; }
    public void setNetSalary(double netSalary) { this.netSalary = netSalary; }

    // Manual Builder
    public static class PayslipBuilder {
        private User employee;
        private String period;
        private double basicSalary;
        private double allowances;
        private double deductions;
        private double netSalary;

        public PayslipBuilder employee(User employee) { this.employee = employee; return this; }
        public PayslipBuilder period(String period) { this.period = period; return this; }
        public PayslipBuilder basicSalary(double basicSalary) { this.basicSalary = basicSalary; return this; }
        public PayslipBuilder allowances(double allowances) { this.allowances = allowances; return this; }
        public PayslipBuilder deductions(double deductions) { this.deductions = deductions; return this; }
        public PayslipBuilder netSalary(double netSalary) { this.netSalary = netSalary; return this; }

        public Payslip build() {
            return new Payslip(employee, period, basicSalary, allowances, deductions, netSalary);
        }
    }
}
