# 📟 Invoice Management System

A **Full Stack Web Application** for managing companies, customers, products, and generating invoices. Built with **React.js** for the frontend, **Spring Boot** for the backend, and **MySQL** as the database.

---

## 🔧 Tech Stack

* **Frontend**: React.js (JavaScript, Axios, React Router)
* **Backend**: Java, Spring Boot, Spring Data JPA, Spring Security, JWT
* **Database**: MySQL
* **Other Tools**: Maven, Lombok, Git, Postman

---

## 🚀 Features

* Company Registration & Login (JWT Authentication)
* Customer Management (CRUD)
* Product Management (CRUD)
* Invoice Generation:

  * Select existing customer & products
  * Quantity-based calculation
  * PDF export of invoice
* Secure APIs with Role-based Access Control
* Responsive UI with error handling and form validation

---

## 📁 Project Structure

```
invoice-system/
├── backend/                  # Spring Boot Backend
│   ├── src/main/java/com/harsit/backend/
│   │   ├── controller/
│   │   ├── service/
│   │   ├── model/
│   │   ├── repository/
│   │   └── security/
│   └── src/main/resources/
│       └── application.properties
├── frontend/                 # React Frontend
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── services/
│       └── App.js
```

---

## ⚙️ Getting Started

### 1️⃣ Prerequisites

* Node.js & npm
* Java 17+
* Maven
* MySQL Server

---

### 2️⃣ Backend Setup (Spring Boot)

```bash
cd backend
```

* Configure `application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/invoice_db
spring.datasource.username=root
spring.datasource.password=yourpassword

jwt.secret=your_jwt_secret_key
```

* Create database:

```sql
CREATE DATABASE invoice_db;
```

* Run the app:

```bash
./mvnw spring-boot:run
```

---

### 3️⃣ Frontend Setup (React)

```bash
cd frontend
npm install
npm start
```

> Ensure `.env` (if needed) is configured to point to your backend:

```env
REACT_APP_API_BASE_URL=http://localhost:8080/api
```

---

## 🛡️ Security

* Passwords are encrypted using BCrypt
* JWT used for authentication & authorization

---

## 👨‍💼 Author

**Harsit Agarwalla**
Feel free to connect!