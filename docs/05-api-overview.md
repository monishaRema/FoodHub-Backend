# API Overview

## Base URL
/api/v1

---

## Auth

POST /auth/register  
POST /auth/login  
POST /auth/logout  
GET /auth/me  

---

## Public

GET /meals  
GET /meals/:id  
GET /providers  
GET /providers/:id  

---

## Customer

POST /orders  
GET /orders  
GET /orders/:id  

POST /reviews  

---

## Provider

GET /provider/meals  
POST /provider/meals  
PATCH /provider/meals/:id  
DELETE /provider/meals/:id  

GET /provider/orders  
PATCH /provider/orders/:id/status  

---

## Admin

GET /admin/users  
PATCH /admin/users/:id/status  

GET /admin/orders  

GET /admin/categories  
POST /admin/categories  
PATCH /admin/categories/:id  
DELETE /admin/categories/:id  

---

## Authentication

- JWT-based authentication
- Token stored in httpOnly cookie
- Middleware protects private routes

---

## Authorization

Role-based access control:
- CUSTOMER
- PROVIDER
- ADMIN