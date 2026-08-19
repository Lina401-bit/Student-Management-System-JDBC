# Student Management System

A full-stack **Student Management System** built with **Spring Boot, React, MySQL, and REST APIs**. The application provides secure authentication, role-based access, student management, user management, profile management, activity auditing, reporting, and a responsive web interface.

## 🚀 Project Overview

The Student Management System is designed to manage student records through a modern web application.

The project consists of:

* **Frontend:** React + Vite
* **Backend:** Spring Boot REST API
* **Database:** MySQL
* **Authentication:** Spring Security + JWT
* **ORM:** Hibernate / JPA
* **Build Tool:** Maven

## ✨ Features

### 🔐 Authentication & Security

* User Registration
* User Login
* User Logout
* JWT-based authentication
* Protected routes
* Role-based access control
* Admin and User dashboards
* Password change functionality
* Session management
* Secure password handling

### 👨‍🎓 Student Management

* Add Student
* View Students
* View Student by ID
* Update Student
* Delete Student
* Search students by name
* Student validation
* Pagination
* Sorting
* Filtering

### 👥 User Management

* View users
* User profile
* Update profile
* Change password
* User status management
* Role-based permissions

### 📋 Activity Logs

The system maintains an audit trail for important activities, including:

* Login
* Logout
* Registration
* Create
* Update
* Delete
* Password Change

The Activity Logs module provides:

* Log listing
* Search
* Filtering
* Pagination
* Role-based access
* CSV export

### 📊 Dashboard

The application provides dashboards with:

* Total student count
* User information
* Recent records
* Administrative statistics
* Separate Admin and User dashboards

### 📑 Reports & Settings

* Reports section
* Application settings
* Profile management
* User-specific dashboard
* Administrative controls

## 🛠️ Technologies Used

### Backend

* Java
* Spring Boot
* Spring Security
* Spring Data JPA
* Hibernate
* REST API
* JWT
* Maven
* MySQL

### Frontend

* React
* Vite
* JavaScript
* HTML5
* CSS3
* React Router

### Database

* MySQL

### Development Tools

* IntelliJ IDEA
* VS Code
* Postman
* Git
* GitHub

## 📁 Project Structure

```text
Student-Management-System-JDBC/
│
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/example/StudentManagementAPI/
│   │   │       ├── config/
│   │   │       ├── controller/
│   │   │       ├── dto/
│   │   │       ├── entity/
│   │   │       ├── exception/
│   │   │       ├── repository/
│   │   │       ├── security/
│   │   │       └── service/
│   │   │
│   │   └── resources/
│   │       └── application.properties
│   │
│   └── test/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── css/
│   │   ├── services/
│   │   ├── assets/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
│
├── pom.xml
├── mvnw
├── mvnw.cmd
└── .gitignore
```

## ⚙️ Backend Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Lina401-bit/Student-Management-System-JDBC.git
```

### 2. Open the Backend Project

Open the cloned project in IntelliJ IDEA or another Java IDE.

### 3. Configure MySQL

Create a MySQL database:

```sql
CREATE DATABASE studentdb;
```

Configure the database connection using an environment variable for the password:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/studentdb
spring.datasource.username=root
spring.datasource.password=${DB_PASSWORD}
```

Set your MySQL password in the environment before starting the backend.

### 4. Run the Backend

Using Maven:

```bash
./mvnw spring-boot:run
```

On Windows:

```cmd
mvnw.cmd spring-boot:run
```

The backend runs on:

```text
http://localhost:8080
```

## 💻 Frontend Setup

Open a terminal in the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the React development server:

```bash
npm run dev
```

The frontend will normally run on:

```text
http://localhost:5173
```

## 🔗 Application Architecture

```text
React Frontend
      │
      │ REST API / HTTP
      ▼
Spring Boot Backend
      │
      ├── Spring Security + JWT
      ├── Controllers
      ├── Services
      ├── Repositories
      └── Hibernate / JPA
              │
              ▼
          MySQL Database
```

## 🔑 Main Modules

| Module             | Description                                      |
| ------------------ | ------------------------------------------------ |
| Authentication     | Login, registration, logout and JWT security     |
| Student Management | Create, read, update, delete and search students |
| User Management    | Manage users, profiles and passwords             |
| Dashboard          | Admin and user dashboards                        |
| Activity Logs      | Track important system activities                |
| Reports            | View application information and reports         |
| Settings           | Manage application settings                      |
| Security           | Role-based access and protected routes           |

## 🌐 API

The backend exposes REST APIs for:

* Authentication
* Student management
* User management
* Profile management
* Activity logs
* Password management

The API can be tested using **Postman** or through the React frontend.

## 🔒 Security

Sensitive credentials are not stored directly in the source code.

Database credentials should be supplied through environment variables:

```text
DB_PASSWORD
```

Do not commit passwords, API keys, JWT secrets, or other sensitive credentials to GitHub.

## 📌 Future Enhancements

* Refresh token implementation
* Advanced analytics dashboard
* Email notifications
* Docker deployment
* Cloud database integration
* Production deployment
* Automated testing and CI/CD

## 👩‍💻 Author

**Lina Patil**

Java / Spring Boot / Full-Stack Developer

## 📄 License

This project is developed for educational and portfolio purposes.
