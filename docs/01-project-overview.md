# FoodHub Backend Overview

## Summary

FoodHub Backend is an Express 5 and TypeScript API for a multi-role meal ordering platform. The API supports public catalog browsing, customer ordering, provider meal management, and admin moderation features.

The application is mounted under `/api` and uses cookie-based JWT authentication for protected routes.

## Roles

- `CUSTOMER`: default registered user who can place orders and submit reviews
- `PROVIDER`: a user who has created a provider profile and can manage their own meals and orders
- `ADMIN`: a privileged user who can manage users and categories

## What the Current Codebase Supports

### Public access

- Health check
- Register, login, logout, refresh token
- Browse available meals
- Read a single meal
- Read reviews for a meal
- Browse providers
- Read a single provider

### Authenticated customer capabilities

- View current profile
- Create an order from meals belonging to one provider
- List own orders
- Read a single own order
- Cancel own order while status is `PENDING` or `CONFIRMED`
- Create a review for a delivered order

### Authenticated provider capabilities

- Create a provider profile
- Create, list, read, update, and delete own meals
- List own provider orders

### Admin capabilities

- List users
- Update user status
- List categories
- Read a single category
- Create, update, and delete categories

## Important Business Rules Enforced in Code

- One order can include meals from only one provider.
- Only meals with `AVAILABLE` status can be ordered.
- Duplicate meal items in a single order are rejected.
- A user can create only one provider profile.
- A provider can manage only their own meals and orders.
- A category cannot be deleted while meals still reference it.
- Reviews are allowed only for delivered orders and only for meals included in that order.
- A user can review a given meal only once.

## Response Conventions

Successful responses use this shape:

```json
{
  "success": true,
  "message": "Human readable message",
  "data": {}
}
```

Error responses use this shape:

```json
{
  "success": false,
  "message": "Error message",
  "errorDetails": [
    {
      "field": "body.email",
      "message": "Invalid email address"
    }
  ]
}
```

## Notable Implementation Notes

- The base path is `/api`, not `/api/v1`.
- Authentication reads the `access-token` cookie, not an `Authorization` header.
- `GET /api/admin/category` and `GET /api/admin/category/:id` require authentication but are not additionally restricted to `ADMIN` in the current router.
- Two routes are wired unusually in the current code:
  - `GET /api/admin/users/:id/status` updates a user's status and expects a request body.
  - `GET /api/provider/orders/:id/status` is registered, but it currently calls the provider order listing controller instead of the order status update controller.
