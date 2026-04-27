# API Overview

## Base URL

`/api`

## Authentication Model

- Protected routes require the `access-token` cookie.
- Login sets both `access-token` and `refresh-token`.
- Refresh token reads the `refresh-token` cookie and issues a fresh access token cookie.
- The API does not currently use bearer-token headers in its auth middleware.

## Route Groups

### System

- `GET /`

### Auth

- `POST /auth/register`
- `POST /auth/login`
- `POST /auth/logout`
- `POST /auth/refresh-token`
- `GET /auth/me`

### Public catalog

- `GET /meals`
- `GET /meals/:id`
- `GET /meals/:id/reviews`
- `GET /providers`
- `GET /providers/:id`

### Provider area

- `POST /provider/profile`
- `GET /provider/meals`
- `GET /provider/meals/:id`
- `POST /provider/meals`
- `PATCH /provider/meals/:id`
- `DELETE /provider/meals/:id`
- `GET /provider/orders`
- `GET /provider/orders/:id/status`

### Customer area

- `POST /orders`
- `GET /orders`
- `GET /orders/:id`
- `PATCH /orders/:id/cancel`
- `POST /reviews`

### Admin area

- `GET /admin/category`
- `GET /admin/category/:id`
- `POST /admin/category`
- `PATCH /admin/category/:id`
- `DELETE /admin/category/:id`
- `GET /admin/users`
- `GET /admin/users/:id/status`

## Validation Patterns

- Path ids are validated as UUIDs.
- Pagination uses `page` and `limit`.
- Validation errors return `400` with `errorDetails`.

## Success Response Shape

```json
{
  "success": true,
  "message": "Fetched meals successfully",
  "data": []
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

- The current code mounts category routes under `/admin/category`, not `/admin/categories`.
- The current code exposes user-status change as `GET /admin/users/:id/status` with a request body.
- The current code exposes provider order-status path `GET /provider/orders/:id/status`, but the route is not currently wired to the update controller.
