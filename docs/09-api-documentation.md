# API Documentation

## 1. Introduction

This document describes the current FoodHub Backend API implementation.

Base path:

`/api`

Authentication model:

- protected routes use the `access-token` cookie
- refresh flow uses the `refresh-token` cookie
- authentication failures return `401`
- authorization failures return `403`

## 2. Standard Response Format

### 2.1 Success Response

```json
{
  "success": true,
  "message": "Operation completed",
  "data": {}
}
```

Paginated responses also include:

```json
{
  "meta": {
    "page": 1,
    "limit": 10,
    "totalItems": 42,
    "totalPage": 5
  }
}
```

### 2.2 Error Response

```json
{
  "success": false,
  "message": "Validation failed",
  "errorDetails": [
    {
      "field": "email",
      "message": "Invalid email address"
    }
  ]
}
```

## 3. Authentication Details

Cookies used by the API:

- `access-token`
- `refresh-token`

Notes:

- `access-token` is required for protected endpoints
- `refresh-token` is required for token refresh
- tokens are stored in `httpOnly` cookies
- cookies use `sameSite: "strict"`
- cookies use `secure: true` only in `PROD`

## 4. System Endpoint

### 4.1 `GET /api/`

Purpose:

- health check / welcome endpoint

Success response:

```json
{
  "success": true,
  "message": "Welcome to FoodHub backend server"
}
```

## 5. Auth Endpoints

### 5.1 `POST /api/auth/register`

Purpose:

- register a new user

Request body:

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "secret123",
  "phone": "+97450000000",
  "image": "https://example.com/avatar.jpg"
}
```

Validation rules:

- `name`: required, max 100 characters
- `email`: must be a valid email
- `password`: minimum 6 characters
- `phone`: optional, 5 to 20 characters
- `image`: optional valid URL

Success:

- `201 Created`

### 5.2 `POST /api/auth/login`

Purpose:

- authenticate a user and set login cookies

Request body:

```json
{
  "email": "jane@example.com",
  "password": "secret123"
}
```

Success:

- `200 OK`
- sets `access-token`
- sets `refresh-token`

Possible errors:

- `401` no user found with this email
- `401` invalid password
- `403` account is not allowed to log in

### 5.3 `POST /api/auth/logout`

Purpose:

- clear auth cookies

Success:

- `200 OK`

### 5.4 `POST /api/auth/refresh-token`

Purpose:

- issue a new access token from the refresh token cookie

Success:

- `200 OK`

Possible errors:

- `401` refresh token required
- `401` refresh token invalid or expired
- `404` user not found
- `403` inactive account

### 5.5 `GET /api/auth/me`

Purpose:

- return the authenticated user's profile data

Authentication:

- required

## 6. Public Meal Endpoints

### 6.1 `GET /api/meals`

Purpose:

- return paginated public meals

Query parameters:

- `search?: string`
- `page?: number`, default `1`
- `limit?: number`, default `10`, max `100`
- `sortBy?: createdAt | updatedAt | price | name`, default `createdAt`
- `sortOrder?: asc | desc`, default `desc`

Behavior:

- only meals with `availability = AVAILABLE` are returned
- search matches `name`, `excerpt`, `details`, and dietary enum text when applicable

### 6.2 `GET /api/meals/featured`

Purpose:

- return paginated featured public meals

Query parameters:

- `page?: number`, default `1`
- `limit?: number`, default `10`, max `100`

Behavior:

- only meals with `isFeatured = true` and `availability = AVAILABLE` are returned

### 6.3 `GET /api/meals/:id`

Purpose:

- return one meal by UUID

Possible errors:

- `404` meal not found

### 6.4 `GET /api/meals/:id/reviews`

Purpose:

- return reviews for a specific meal

Query parameters:

- `page?: number`
- `limit?: number`

Possible errors:

- `404` meal not found

## 7. Public Provider Endpoints

### 7.1 `GET /api/providers`

Purpose:

- return paginated providers

Query parameters:

- `search?: string`
- `page?: number`, default `1`
- `limit?: number`, default `10`, max `100`
- `sortBy?: createdAt | updatedAt | shopName`, default `createdAt`
- `sortOrder?: asc | desc`, default `desc`

### 7.2 `GET /api/providers/:id`

Purpose:

- return one provider by UUID

Possible errors:

- `404` no provider found

### 7.3 `GET /api/providers/:id/meals`

Purpose:

- return meals for a single provider

Query parameters:

- `search?: string`
- `page?: number`, default `1`
- `limit?: number`, default `10`, max `100`
- `sortBy?: createdAt | updatedAt | price | name`, default `createdAt`
- `sortOrder?: asc | desc`, default `desc`

Implementation note:

- the current repository method paginates provider meals but does not apply the incoming search or sort options

## 8. Provider Endpoints

All `/api/provider/*` routes require authentication.

### 8.1 `POST /api/provider/profile`

Purpose:

- create a provider profile for the authenticated user

Request body:

```json
{
  "shopName": "Spice House",
  "address": "Doha, Qatar",
  "shopImage": "https://example.com/shop.jpg"
}
```

Rules:

- only a user with role `CUSTOMER` can create a provider profile
- a user cannot create more than one provider profile
- creating a provider profile promotes the user role to `PROVIDER`

### 8.2 `GET /api/provider/meals`

Purpose:

- return meals owned by the authenticated provider

Authentication:

- required
- provider role required

Query parameters:

- `page?: number`, default `1`
- `limit?: number`, default `10`, max `100`

### 8.3 `GET /api/provider/meals/:id`

Purpose:

- return one provider-owned meal

Authentication:

- required
- provider role required

Possible errors:

- `404` meal not found
- `403` meal belongs to another provider

### 8.4 `POST /api/provider/meals`

Purpose:

- create a meal under the authenticated provider

Authentication:

- required
- provider role required

Request body:

```json
{
  "name": "Chicken Biryani",
  "image": "https://example.com/biryani.jpg",
  "price": 24.5,
  "dietary": "NON_VEG",
  "excerpt": "Signature rice dish",
  "details": "Long description here",
  "categoryId": "00000000-0000-0000-0000-000000000000",
  "isFeatured": true,
  "availability": "AVAILABLE"
}
```

Validation rules:

- `price` must be positive
- `dietary` must be `VEG`, `NON_VEG`, or `VEGAN`
- `excerpt` maximum length is `100`
- `categoryId` must be a valid UUID
- `availability` must be `AVAILABLE` or `UNAVAILABLE`

### 8.5 `PATCH /api/provider/meals/:id`

Purpose:

- update a provider-owned meal

Authentication:

- required
- provider role required

Allowed fields:

- `name`
- `image`
- `price`
- `dietary`
- `excerpt`
- `details`
- `categoryId`
- `isFeatured`
- `availability`

Rules:

- at least one field is required
- category must exist if `categoryId` is provided
- provider can update only their own meals

### 8.6 `DELETE /api/provider/meals/:id`

Purpose:

- delete a provider-owned meal

Authentication:

- required
- provider role required

Rules:

- provider can delete only their own meals
- deletion can fail with `409` if the meal is already referenced by orders

### 8.7 `GET /api/provider/orders`

Purpose:

- return paginated orders for the authenticated provider

Authentication:

- required

Query parameters:

- `page?: number`, default `1`
- `limit?: number`, default `10`, max `100`

### 8.8 `PATCH /api/provider/orders/:id/status`

Purpose:

- update the status of a provider-owned order

Authentication:

- required

Request body:

```json
{
  "status": "CONFIRMED"
}
```

Allowed request values:

- `CONFIRMED`
- `PREPARING`
- `READY`
- `DELIVERED`

Allowed transition flow:

- `PENDING -> CONFIRMED`
- `CONFIRMED -> PREPARING`
- `PREPARING -> READY`
- `READY -> DELIVERED`

Possible errors:

- `404` provider not found
- `404` order not found
- `403` order belongs to another provider
- `409` invalid status transition

## 9. Order Endpoints

All `/api/orders/*` routes require authentication.

### 9.1 `POST /api/orders`

Purpose:

- create an order for the authenticated user

Request body:

```json
{
  "deliveryAddress": "West Bay, Doha",
  "contactPhone": "+97450000000",
  "items": [
    {
      "mealId": "00000000-0000-0000-0000-000000000000",
      "quantity": 2
    }
  ]
}
```

Rules:

- at least one item is required
- meal ids must be unique within the payload
- quantity must be a positive integer
- all meals must exist
- all meals must be available
- all meals must belong to the same provider

### 9.2 `GET /api/orders`

Purpose:

- return paginated orders for the authenticated user

Query parameters:

- `page?: number`
- `limit?: number`

Current implementation note:

- if the user has no orders, the service currently returns `401`

### 9.3 `GET /api/orders/:id`

Purpose:

- return one order belonging to the authenticated user

Possible errors:

- `404` order not found
- `403` order belongs to another user

### 9.4 `PATCH /api/orders/:id/cancel`

Purpose:

- cancel an order belonging to the authenticated user

Allowed current statuses:

- `PENDING`
- `CONFIRMED`

Possible errors:

- `404` order not found
- `403` order belongs to another user
- `409` order is no longer cancellable

## 10. Review Endpoints

All `/api/reviews/*` routes require authentication.

### 10.1 `POST /api/reviews`

Purpose:

- create a review tied to a delivered order

Request body:

```json
{
  "mealId": "00000000-0000-0000-0000-000000000000",
  "orderId": "00000000-0000-0000-0000-000000000000",
  "rating": 5,
  "content": "Excellent meal and packaging."
}
```

Rules:

- `rating` must be an integer from `1` to `5`
- `content` must be between 3 and 500 characters
- order must exist
- order must belong to the current user
- order must be `DELIVERED`
- meal must be part of that order
- duplicate review for the same user and meal is rejected

### 10.2 `GET /api/reviews/eligibility/:id`

Purpose:

- check whether the authenticated user is currently allowed to review the meal identified by `:id`

Response behavior:

- returns an eligibility payload with `eligibility: true | false`
- when eligible, includes the related `orderId`
- when not eligible, includes a human-readable reason message

## 11. Admin Category Endpoints

All `/api/admin/category/*` routes require authentication through the mount.

### 11.1 `GET /api/admin/category`

Purpose:

- return all categories

Current access behavior:

- any authenticated user can access this route

### 11.2 `GET /api/admin/category/:id`

Purpose:

- return one category by UUID

Current access behavior:

- admin role required

### 11.3 `POST /api/admin/category`

Purpose:

- create a category

Authentication:

- required
- admin role required

Request body:

```json
{
  "name": "Burgers"
}
```

### 11.4 `PATCH /api/admin/category/:id`

Purpose:

- update a category

Authentication:

- required
- admin role required

Request body:

```json
{
  "name": "Wraps"
}
```

Rules:

- category must exist
- category name must remain unique

### 11.5 `DELETE /api/admin/category/:id`

Purpose:

- delete a category

Authentication:

- required
- admin role required

Rules:

- category must exist
- category cannot be deleted while meals still reference it

## 12. Admin User Endpoints

All `/api/admin/users/*` routes require authentication and role `ADMIN`.

### 12.1 `GET /api/admin/users`

Purpose:

- return paginated users

Query parameters:

- `page?: number`
- `limit?: number`

### 12.2 `PATCH /api/admin/users/:id/status`

Purpose:

- update a user's status

Request body:

```json
{
  "status": "SUSPENDED"
}
```

Allowed values:

- `ACTIVE`
- `SUSPENDED`

Possible errors:

- `404` user not found
- `409` user already has the requested status

## 13. Admin Order Endpoints

All `/api/admin/orders/*` routes require authentication and role `ADMIN`.

### 13.1 `GET /api/admin/orders`

Purpose:

- return paginated platform-wide orders

Query parameters:

- `page?: number`
- `limit?: number`

Response note:

- each item includes provider summary, user summary, and order items

### 13.2 `GET /api/admin/orders/:id`

Purpose:

- return a single platform-wide order

Current implementation note:

- the service returns repository output directly and does not throw a custom `404` when the order is missing
