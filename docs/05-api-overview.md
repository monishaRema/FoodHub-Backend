# API Overview

## Base URL

`/api`

## Authentication Model

- Protected routes require the `access-token` cookie.
- Login sets both `access-token` and `refresh-token`.
- Refresh token reads the `refresh-token` cookie and issues a fresh access token cookie.
- The API does not currently use bearer-token headers in auth middleware.
- Cookies are `httpOnly` and `sameSite: "strict"`.
- Cookies are `secure` only when `NODE_ENV=PROD`.

## Rate Limiting

- A global limiter is mounted for all routes with a 15-minute window and limit `200`.
- An auth-specific limiter is mounted for `/api/auth` with a 15-minute window and limit `100`.

## Route Groups

### System

- `GET /`

### Auth

- `POST /auth/register`
- `POST /auth/login`
- `POST /auth/logout`
- `POST /auth/refresh-token`
- `GET /auth/me`

### Public meals

- `GET /meals`
- `GET /meals/featured`
- `GET /meals/:id`
- `GET /meals/:id/reviews`

### Public providers

- `GET /providers`
- `GET /providers/:id`
- `GET /providers/:id/meals`

### Provider area

- `POST /provider/profile`
- `GET /provider/meals`
- `GET /provider/meals/:id`
- `POST /provider/meals`
- `PATCH /provider/meals/:id`
- `DELETE /provider/meals/:id`
- `GET /provider/orders`
- `PATCH /provider/orders/:id/status`

### Customer area

- `POST /orders`
- `GET /orders`
- `GET /orders/:id`
- `PATCH /orders/:id/cancel`
- `POST /reviews`
- `GET /reviews/eligibility/:id`

### Admin area

- `GET /admin/orders`
- `GET /admin/orders/:id`
- `GET /admin/category`
- `GET /admin/category/:id`
- `POST /admin/category`
- `PATCH /admin/category/:id`
- `DELETE /admin/category/:id`
- `GET /admin/users`
- `PATCH /admin/users/:id/status`

## Validation Patterns

- Path ids are validated as UUIDs.
- Pagination uses `page` and `limit`.
- Public meals and providers also support `search`, `sortBy`, and `sortOrder`.
- Validation errors return `400` with `errorDetails`.

## Success Response Shape

```json
{
  "success": true,
  "message": "Fetched meals successfully",
  "data": [],
  "meta": {
    "page": 1,
    "limit": 10,
    "totalItems": 0,
    "totalPage": 0
  }
}
```

## Error Response Shape

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

## Accuracy Notes

- `GET /api/admin/category` is authenticated but not additionally role-guarded in the current route file.
- `GET /api/admin/category/:id` is admin-only.
- `GET /api/orders` currently throws `401` when the user has no orders instead of returning an empty page.
