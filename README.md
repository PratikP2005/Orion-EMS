# QuickEMS - Employee Management System

A premium, full-stack Employee Management System (EMS) featuring role-based dashboards, task assignment, and real-time status tracking.

Built with a **Java Spring Boot backend** and a **React.js (Vite) frontend** using modern styling variables (Obsidian dark theme, glassmorphism, responsive grids, and subtle micro-animations).

---

## 🚀 Features

### 🔑 Authentication
- Role-based login (Admin and Employee views).
- Auto-fill demo credentials on the login screen for testing convenience.
- Session persistence via LocalStorage.

### 🛡️ Admin Dashboard
- **Create Tasks**: Create a task by specifying title, description, due date, category, and assigning it to any employee.
- **Aggregated Stats**: View real-time aggregated counts (New, Active, Completed, Failed tasks) across all employees.
- **Detailed Log Table**: Click on any employee row to expand and view their individual task log, dates, and statuses.

### 👨‍💻 Employee Dashboard
- **Personal Metrics**: Live cards showing count of New, Active, Completed, and Failed tasks assigned to the current employee.
- **Interactive Task List**: Beautiful grid of task cards with action buttons to:
  - **Accept** a newly assigned task (moves status to `ACTIVE`).
  - **Complete** an active task (moves status to `COMPLETED`).
  - **Fail** a task (moves status to `FAILED`).

---

## 🛠️ Technology Stack

- **Backend**: Java 21 / 24, Spring Boot 3.4.1 (Spring Web, Spring Data JPA, H2 In-Memory Database).
- **Frontend**: React 19, Vite 8, Lucide React (Icons), Vanilla CSS (Glassmorphism & animations).
- **Integration**: Vite Development Proxy configuration routing `/api/*` requests to port `8080`.

---

## 📁 Folder Structure

```text
Emp_mana/
├── backend/
│   ├── src/main/java/com/ems/
│   │   ├── EmsApplication.java     # Main Spring Boot Runner
│   │   ├── model/                  # JPA Entity definitions (User, Task)
│   │   ├── repository/             # Database Interfaces (UserRepository, TaskRepository)
│   │   ├── controller/             # REST Endpoints (Auth, Employee, Task)
│   │   └── config/                 # Seed Data Initializer
│   └── src/main/resources/
│       └── application.properties  # Database & server configurations
└── frontend/
    ├── src/
    │   ├── main.jsx                # React Entry Point
    │   ├── App.jsx                 # App shell & routing logic
    │   ├── index.css               # Premium design variables & classes
    │   ├── components/
    │   │   ├── Auth/               # Login screen
    │   │   ├── Dashboard/          # Admin & Employee dashboards
    │   │   ├── Task/               # CreateTask, TaskList, TaskStats, AllTasks
    │   │   └── Header.jsx          # User greeting & Logout bar
    └── vite.config.js              # Proxy configured to port 8080
```

---

## 🔑 Default Credentials

The database is pre-seeded with these credentials on startup for instant evaluation:

| Role | Email | Password | Name |
| :--- | :--- | :--- | :--- |
| **Admin** | `admin@me.com` | `123` | Arjun Sharma |
| **Employee 1** | `employee1@me.com` | `123` | Aarav Patel |
| **Employee 2** | `employee2@me.com` | `123` | Diya Iyer |
| **Employee 3** | `employee3@me.com` | `123` | Kabir Mehta |
| **Employee 4** | `employee4@me.com` | `123` | Ishaan Sen |
| **Employee 5** | `employee5@me.com` | `123` | Ananya Rao |

---

## ⚙️ Running the Project Locally

### Prerequisites
- **Java SE Development Kit (JDK 21 or 24)** installed.
- **Node.js (v18+)** and **npm** installed.

### Step 1: Run the Backend Server
Navigate to the `backend` folder and start the Spring Boot application using Maven:
```bash
cd backend
# If you have Maven installed:
mvn spring-boot:run

# Or run it using the portable Maven package provided:
..\apache-maven-3.9.9\bin\mvn spring-boot:run
```
The server will start on **`http://localhost:8080/`**.
- Database console is available at: **`http://localhost:8080/h2-console`**
  - **JDBC URL**: `jdbc:h2:mem:emsdb`
  - **Username**: `sa`
  - **Password**: *(leave blank)*

### Step 2: Run the Frontend App
Open a separate terminal window, navigate to the `frontend` folder, install dependencies, and launch Vite:
```bash
cd frontend
npm install
npm run dev
```
Open **`http://localhost:5173/`** in your browser to interact with the Employee Management System!
