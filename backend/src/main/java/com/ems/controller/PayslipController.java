package com.ems.controller;

import com.ems.model.Payslip;
import com.ems.model.User;
import com.ems.repository.PayslipRepository;
import com.ems.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/payslips")
@CrossOrigin(origins = "*")
public class PayslipController {

    @Autowired
    private PayslipRepository payslipRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public ResponseEntity<List<Payslip>> getAllPayslips() {
        List<Payslip> payslips = payslipRepository.findAll();
        return ResponseEntity.ok(payslips);
    }

    @GetMapping("/employee/{employeeId}")
    public ResponseEntity<List<Payslip>> getEmployeePayslips(@PathVariable Long employeeId) {
        List<Payslip> payslips = payslipRepository.findByEmployeeId(employeeId);
        return ResponseEntity.ok(payslips);
    }

    @PostMapping
    public ResponseEntity<?> generatePayslip(@RequestBody GeneratePayslipRequest request) {
        Optional<User> employeeOpt = userRepository.findById(request.getEmployeeId());
        if (employeeOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid employee ID.");
        }

        double netSalary = request.getBasicSalary() + request.getAllowances() - request.getDeductions();

        Payslip payslip = Payslip.builder()
                .employee(employeeOpt.get())
                .period(request.getPeriod())
                .basicSalary(request.getBasicSalary())
                .allowances(request.getAllowances())
                .deductions(request.getDeductions())
                .netSalary(netSalary)
                .build();

        Payslip savedPayslip = payslipRepository.save(payslip);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedPayslip);
    }

    public static class GeneratePayslipRequest {
        private Long employeeId;
        private String period; // e.g. "February 2026"
        private double basicSalary;
        private double allowances;
        private double deductions;

        public GeneratePayslipRequest() {}
        public GeneratePayslipRequest(Long employeeId, String period, double basicSalary, double allowances, double deductions) {
            this.employeeId = employeeId;
            this.period = period;
            this.basicSalary = basicSalary;
            this.allowances = allowances;
            this.deductions = deductions;
        }

        public Long getEmployeeId() { return employeeId; }
        public void setEmployeeId(Long employeeId) { this.employeeId = employeeId; }
        public String getPeriod() { return period; }
        public void setPeriod(String period) { this.period = period; }
        public double getBasicSalary() { return basicSalary; }
        public void setBasicSalary(double basicSalary) { this.basicSalary = basicSalary; }
        public double getAllowances() { return allowances; }
        public void setAllowances(double allowances) { this.allowances = allowances; }
        public double getDeductions() { return deductions; }
        public void setDeductions(double deductions) { this.deductions = deductions; }
    }
}
