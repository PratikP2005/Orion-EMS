# Orion EMS

<p align="center">
  <img src="./frontend/public/logo.png" alt="Orion EMS Logo" width="100" />
</p>

A full-stack Employee Management System built with React and Spring Boot. Handles employee records, leave applications, daily attendance, payroll generation, and profile management backed by a MySQL database.

---

## Features

- **Admin & Employee Dashboards**: Role-based access with different views for administrators and staff.
- **Employee Directory**: Manage employee profiles with live search, department/role filtering, and an edit modal for details & salaries.
- **Leave Management**: Submit leave requests with automatic status tracking (Pending, Approved, Rejected).
- **Attendance Tracker**: Daily clock-in/clock-out with working hours calculation and automatic late check-in detection (after 09:15 AM).
- **Payroll & Payslips**: Generate, search, sort, and view printable salary slips formatted in Indian Rupee (₹).
- **Profile & Settings**: Upload custom profile avatars (saved in MySQL), edit bio, and change account passwords.

---

## Future Improvements

- **Notification System**: Real-time alerts for leave approvals and task assignments using WebSockets.
- **Export & Reporting**: Enhanced CSV/PDF export capabilities for HR attendance and payroll reports.
- **Interactive Analytics**: Add charts (e.g., Recharts) for attendance trends, leave utilization, and task completion rates.
- **Advanced Role Permissions**: Finer granular permissions for department managers and team leads.

---

## Tech Stack

### Frontend
- React 19 + Vite
- Lucide React (Icons)
- Custom CSS (Dark obsidian theme with glassmorphism)

### Backend
- Java 21 / 24 + Spring Boot 3.4.1
- Spring Data JPA / Hibernate
- MySQL 8.0

---

## Project Structure

```text
Emp_mana/
├── backend/
│   ├── src/main/java/com/ems/
│   │   ├── controller/      # Auth, Employee, Leave, Attendance, Payslip REST endpoints
│   │   ├── model/           # User, Task, LeaveApplication, AttendanceRecord, Payslip entities
│   │   ├── repository/      # JPA repositories
│   │   └── config/          # Database seeding configuration
│   └── src/main/resources/
│       └── application.properties
└── frontend/
    ├── public/
    │   └── logo.png         # App logo
    └── src/
        ├── App.jsx
        ├── index.css
        └── components/      # Auth & Dashboard UI components
```

---

## Demo Accounts

The database comes pre-populated with sample accounts for testing:

| Role | Email | Password | Name |
| :--- | :--- | :--- | :--- |
| **Admin** | `admin@me.com` | `123` | Arjun Sharma |
| **Employee** | `aarav.singh@me.com` | `123` | Aarav Singh |
| **Employee** | `vihaan.patel@me.com` | `123` | Vihaan Patel |
| **Employee** | `aditya.kumar@me.com` | `123` | Aditya Kumar |

---

## Getting Started

### Prerequisites
- Node.js (v18+) and npm
- Java 21 or Java 24
- MySQL 8.0 running locally

### 1. Database Setup
Create a MySQL database named `emsdb`:
```sql
CREATE DATABASE emsdb;
```

Update your MySQL username and password in `backend/src/main/resources/application.properties` if needed:
```properties
spring.datasource.username=root
spring.datasource.password=your_password
```

### 2. Start Backend Server
```bash
cd backend
mvn spring-boot:run
```
> Or run using the included Maven wrapper: `..\apache-maven-3.9.9\bin\mvn.cmd spring-boot:run`

The Spring Boot server will run at `http://localhost:8080`.

### 3. Start Frontend App
Open a new terminal window:
```bash
cd frontend
npm install
npm run dev
```

Visit `http://localhost:5173` in your browser.
