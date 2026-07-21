# Orion EMS - Enterprise Workforce Management Platform

![Orion EMS Logo](./frontend/public/logo.png)

A modern, full-stack Enterprise Employee Management System (EMS) designed for managing workforce directories, leave requests, attendance tracking, payroll, and profile settings.

Built with a **Java Spring Boot backend**, **MySQL database**, and a **React.js (Vite) frontend** featuring modern dark-mode styling, glassmorphism, responsive grids, and Indian Rupee (₹) currency formatting.

---

## 🌟 Key Features

### 🔑 Authentication & Portals
- **Role-Based Access**: Dedicated Admin and Employee portals.
- **Session Persistence**: Session management via LocalStorage and backend user resolution endpoints.

### 🛡️ Admin Dashboard
- **Live Statistics**: Real-time counts for Total Employees, Pending Leave Applications, Clocked-in Employees, and Active Tasks.
- **Recent Activity Feed**: Dynamic real-time table displaying incoming leave requests directly on the dashboard.

### 👥 Workforce Directory & Employee Management
- **Pre-seeded Dataset**: Pre-populated with 20 Indian employee profiles.
- **Instant Search & Filtering**: Live search bar combined with Role (Admin/Employee) and Department (Engineering, IT, HR, QA, Product, etc.) dropdown filters.
- **Edit Employee Modal**: Click the 3-dots menu on any employee card to edit First/Last Name, Email, Phone, Department, Position, Role, and Basic Salary.

### 📅 Leave Management
- **Leave Request Submission**: Employees can apply for Annual, Sick, or Casual leave with date pickers and reason explanations.
- **Admin Review**: Admins can approve or reject pending applications with real-time status updates saved in MySQL.

### ⏰ Attendance Tracker
- **Clock In / Clock Out**: Live digital clock with one-click check-in and check-out.
- **Late Check-in Calculation**: Automatically flags check-ins after 09:15 AM as "Late".
- **Work Hours & History**: Calculates exact working hours and displays historical attendance logs.

### 💰 Payroll & Payslips
- **Rupee (₹) Currency**: All salaries, earnings, allowances, and deductions formatted in Indian Rupee (₹).
- **Employee Payslip Generation**: Admin modal to issue monthly salary slips.
- **Search & Sort**: Search payslips by employee name or ID (`EMP-001`), and sort by Newest First or Oldest First.
- **Printable Payslip Modal**: Generate printable PDF-ready salary slips with itemized breakdown.

### ⚙️ Profile & Settings
- **Avatar Photo Upload**: Upload custom profile avatars with instant preview and permanent MySQL database persistence (`LONGTEXT`).
- **Profile Details**: Update Full Name, Position, and Bio synced across the sidebar and session.
- **Security Section**: Change password with current password verification and confirmation checks.

---

## 🛠️ Technology Stack

- **Backend Framework**: Java 21 / 24, Spring Boot 3.4.1 (Spring Web, Spring Data JPA, Hibernate).
- **Database**: MySQL 8.0 (`emsdb` database, HikariCP connection pool).
- **Frontend Framework**: React 19, Vite 8, Lucide React (Icons).
- **Styling**: Vanilla CSS (CSS variables, glassmorphism, responsive grids).
- **Proxy Configuration**: Vite dev server configured to proxy `/api/*` requests to Spring Boot on port `8080`.

---

## 📁 Folder Structure

```text
Emp_mana/
├── backend/
│   ├── src/main/java/com/ems/
│   │   ├── EmsApplication.java             # Spring Boot Main Class
│   │   ├── model/                          # JPA Entities (User, Task, LeaveApplication, AttendanceRecord, Payslip)
│   │   ├── repository/                     # Spring Data JPA Repositories
│   │   ├── controller/                     # REST API Controllers (Auth, Employee, Task, Leave, Attendance, Payslip)
│   │   └── config/                         # DataInitializer (Seeding 20 employees, payslips, leaves, attendance)
│   └── src/main/resources/
│       └── application.properties          # MySQL datasource & Hibernate DDL configuration
└── frontend/
    ├── public/
    │   └── logo.png                        # Official Orion EMS Logo
    └── src/
        ├── App.jsx                         # Main Application Shell
        ├── index.css                       # Design system & CSS variables
        └── components/
            ├── Auth/                       # Login screen
            └── Dashboard/                  # Sidebar, DashboardOverview, EmployeesList, LeaveManagement, Attendance, Payslips, Settings
```

---

## 🔑 Default Credentials

The MySQL database is automatically pre-seeded with credentials for quick testing:

| Role | Email | Password | Name |
| :--- | :--- | :--- | :--- |
| **Admin** | `admin@me.com` | `123` | Arjun Sharma |
| **Employee 1** | `aarav.singh@me.com` | `123` | Aarav Singh |
| **Employee 2** | `vihaan.patel@me.com` | `123` | Vihaan Patel |
| **Employee 3** | `aditya.kumar@me.com` | `123` | Aditya Kumar |
| **Employee 4** | `sai.gupta@me.com` | `123` | Sai Gupta |
| **Employee 5** | `krishna.deshmukh@me.com` | `123` | Krishna Deshmukh |

---

## ⚙️ Local Setup Instructions

### Prerequisites
- **JDK 21 or 24** installed.
- **Node.js (v18+)** and **npm** installed.
- **MySQL Server 8.0** running locally on port `3306` with database `emsdb` created:
  ```sql
  CREATE DATABASE emsdb;
  ```

### Step 1: Run the Spring Boot Backend
Navigate to the `backend` directory and run Maven:
```bash
cd backend
..\apache-maven-3.9.9\bin\mvn.cmd spring-boot:run
```
The backend server runs on **`http://localhost:8080`**.

### Step 2: Run the React Frontend
Open a second terminal, navigate to `frontend`, install dependencies, and launch Vite:
```bash
cd frontend
npm install
npm run dev
```
Open **`http://localhost:5173`** in your browser to start using **Orion EMS**!
