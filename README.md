# Riot – Take Home Backend

Simple API built with **NestJS** for the Riot take-home assignment.

---

## 🚀 API Documentation (OpenAPI)

The API is documented using **OpenAPI / Swagger**.

Once the application is running, you can access the documentation at:

http://localhost:3000/docs


From there, you can explore all endpoints (`encrypt`, `decrypt`, `sign`, `verify`) and try them directly.

---

## 🔐 Authentication

The API is protected using **JWT authentication**.

### How it works
1. Call `POST /auth/login` with credentials to retrieve a JWT token.
2. Use this token in subsequent requests with the header:

Authorization: Bearer <your_token>


If the token is missing or invalid, the API returns **401 Unauthorized**.

---

## 🧪 Running tests

Unit tests are written with **Jest**.

To run all tests:

```bash
npm run test
```
## ▶️ Run the application

```bash
npm install
npm run start:dev
```
The server will start on:
http://localhost:3000
