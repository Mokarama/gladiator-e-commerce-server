# ⚙️ Gladiators E-Commerce Server

A scalable and production-ready REST API built with **Express.js**, **PostgreSQL**, and **Prisma ORM** for the Gladiators E-Commerce platform.

---

## 🚀 Live API

> Add your deployed backend URL here

```
https://your-backend-url.onrender.com
```

---

## 📌 Overview

Gladiators E-Commerce Server powers the complete backend of the application, including authentication, authorization, product management, database operations, and API services.

The project has been migrated from **MongoDB + Mongoose** to **PostgreSQL + Prisma ORM**, providing better scalability, performance, and maintainability.

---

## ✨ Features

- JWT Authentication
- Secure Password Hashing
- User Registration
- User Login
- User Profile
- Role-Based Authorization
- Product CRUD Operations
- Product Search
- Product Filtering
- Product Sorting
- Pagination
- Prisma ORM
- PostgreSQL Database
- Database Seeder
- RESTful API Architecture
- Clean Folder Structure

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- PostgreSQL
- Prisma ORM
- JWT
- bcryptjs
- dotenv
- cors
- nodemon

---

## 📂 Project Structure

```
controllers
config
middleware
routes
lib
prisma
models
server.js
seeder.js
```

---

## 🗄️ Database

Database

```
PostgreSQL
```

ORM

```
Prisma ORM
```

---

## 🔐 Authentication

- Register
- Login
- JWT Token
- Protected Routes
- Admin Authorization

---

## 📦 Product Module

- Get All Products
- Get Product Details
- Create Product
- Update Product
- Delete Product
- Search
- Filter
- Sort
- Pagination

---

## 🌱 Seeder

The project includes a database seeder.

Seed demo data

```bash
node seeder.js
```

Demo Credentials

### 👨‍💼 Admin

Email

```
admin@gladiator.com
```

Password

```
demo1234
```

---

### 👤 User

Email

```
user@gladiator.com
```

Password

```
demo1234
```

---

## ⚙️ Environment Variables

Create a `.env` file.

```env
PORT=5000

DATABASE_URL=your_postgresql_database_url

JWT_SECRET=your_jwt_secret

CLIENT_URL=http://localhost:3000
```

---

## 📦 Installation

Clone the repository

```bash
git clone https://github.com/Mokarama/gladiator-e-commerce-server.git
```

Go to the project directory

```bash
cd gladiator-e-commerce-server
```

Install dependencies

```bash
npm install
```

Generate Prisma Client

```bash
npx prisma generate
```

Run Migration

```bash
npx prisma migrate dev --name init
```

Seed Database

```bash
node seeder.js
```

Run Server

```bash
npm run dev
```

Server URL

```
http://localhost:5000
```

---

## 📌 API Endpoints

### Authentication

```
POST   /api/auth/register

POST   /api/auth/login

GET    /api/auth/profile
```

### Products

```
GET    /api/products

GET    /api/products/:id

POST   /api/products

PUT    /api/products/:id

DELETE /api/products/:id
```

---

## 🚀 Deployment

Recommended Deployment

Backend

- Render

Database

- Neon PostgreSQL

Frontend

- Vercel

---

## 👨‍💻 Author

**Mokarama Akter Shanta**

Computer Science & Engineering, RUET

GitHub

https://github.com/Mokarama

---

## 📄 License

This project is developed for educational and portfolio purposes.