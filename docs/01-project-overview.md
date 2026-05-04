# FoodHub Backend Overview

## Summary

FoodHub Backend is an Express 5 + TypeScript API for a multi-role meal ordering platform. It provides public catalog browsing, customer ordering, provider operations, and admin management features.

The application is mounted under `/api` and uses cookie-based JWT authentication for protected routes.

## Roles

- `CUSTOMER`: default registered user who can place orders and submit reviews
- `PROVIDER`: a user who has created a provider profile and can manage their own meals and provider orders
- `ADMIN`: a privileged user who can manage users, categories, and platform-wide order visibility

## What the Current Codebase Supports

### Public access

- `GET /api/`
- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `POST /api/auth/refresh-token`
- `GET /api/meals`
- `GET /api/meals/featured`
- `GET /api/meals/:id`
- `GET /api/meals/:id/reviews`
- `GET /api/providers`
- `GET /api/providers/:id`
- `GET /api/providers/:id/meals`

### Authenticated customer capabilities

- `GET /api/auth/me`
- `POST /api/orders`
- `GET /api/orders`
- `GET /api/orders/:id`
- `PATCH /api/orders/:id/cancel`
- `GET /api/reviews/eligibility/:id`
- `POST /api/reviews`

### Authenticated provider capabilities

- `POST /api/provider/profile`
- `GET /api/provider/meals`
- `GET /api/provider/meals/:id`
- `POST /api/provider/meals`
- `PATCH /api/provider/meals/:id`
- `DELETE /api/provider/meals/:id`
- `GET /api/provider/orders`
- `PATCH /api/provider/orders/:id/status`

### Admin capabilities

- `GET /api/admin/orders`
- `GET /api/admin/orders/:id`
- `GET /api/admin/users`
- `PATCH /api/admin/users/:id/status`
- `GET /api/admin/category`
- `GET /api/admin/category/:id`
- `POST /api/admin/category`
- `PATCH /api/admin/category/:id`
- `DELETE /api/admin/category/:id`

## Important Business Rules Enforced in Code

- One order can include meals from only one provider.
- Only meals with `AVAILABLE` status can be ordered.
- Duplicate meal items in a single order are rejected.
- A user can create only one provider profile.
- Provider meal operations are scoped to the authenticated provider.
- Provider order updates are scoped to the authenticated provider.
- Category names must remain unique.
- A category cannot be deleted while meals still reference it.
- Reviews are allowed only for delivered orders and only for meals included in that order.
- A user can review a given meal only once.

## Response Conventions

Successful responses use:

```json
{
  "success": true,
  "message": "Human readable message",
  "data": {}
}
```

Paginated endpoints also include:

```json
{
  "meta": {
    "page": 1,
    "limit": 10,
    "totalItems": 25,
    "totalPage": 3
  }
}
```

Error responses use:

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
- Login and refresh enforce `ACTIVE` user status, but protected-route middleware does not re-check suspended status on every request.
- Category list at `GET /api/admin/category` requires authentication because of the mount, but it is not additionally restricted to `ADMIN`.
- Category detail at `GET /api/admin/category/:id` is admin-only.
- Auth, global, and pagination behaviors are documented from the current codebase rather than intended future behavior.
