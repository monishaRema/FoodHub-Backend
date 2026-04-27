# API Documentation

## Base Path

All routes in this project are mounted under:

`/api`

## Authentication Details

### Cookies

- `access-token`: required by protected routes
- `refresh-token`: used by `POST /api/auth/refresh-token`

### Protected-route behavior

- Missing access token returns `401`
- Invalid or expired access token returns `401`
- Role checks return `403`

## Response Formats

### Success

```json
{
  "success": true,
  "message": "Operation completed",
  "data": {}
}
```

### Error

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

## System

### `GET /api/`

Health check.

Response message:

- `Server running healthy`

## Auth Endpoints

### `POST /api/auth/register`

Creates a new user.

Body:

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "secret123",
  "phone": "+97450000000",
  "image": "https://example.com/avatar.jpg"
}
```

Validation:

- `name`: required, max 100 chars
- `email`: valid email
- `password`: minimum 6 chars
- `phone`: optional, 5 to 20 chars
- `image`: optional valid URL

Success:

- `201 Created`

### `POST /api/auth/login`

Authenticates a user and sets auth cookies.

Body:

```json
{
  "email": "jane@example.com",
  "password": "secret123"
}
```

Success:

- `200 OK`
- sets `access-token` cookie
- sets `refresh-token` cookie

Possible errors:

- `401` if email is not found
- `401` if password is invalid
- `403` if account status is not `ACTIVE`

### `POST /api/auth/logout`

Clears auth cookies.

Success:

- `200 OK`

### `POST /api/auth/refresh-token`

Reads `refresh-token` from cookies and issues a new access-token cookie.

Success:

- `200 OK`

Possible errors:

- `401` if refresh token is missing
- `401` if refresh token is invalid or expired
- `404` if user no longer exists
- `403` if user is not active

### `GET /api/auth/me`

Requires authentication.

Returns the authenticated user's safe profile data.

## Public Meal Endpoints

### `GET /api/meals`

Returns paginated public meals.

Query params:

- `search?: string`
- `page?: number`, default `1`
- `limit?: number`, default `10`, max `100`
- `sortBy?: createdAt | updatedAt | price | name`, default `createdAt`
- `sortOrder?: asc | desc`, default `desc`

Behavior:

- only meals with `availability = AVAILABLE` are returned
- `search` matches `name`, `excerpt`, `details`, and dietary enum values

### `GET /api/meals/:id`

Returns one meal by UUID.

Possible errors:

- `404` if not found

### `GET /api/meals/:id/reviews`

Returns reviews for a meal.

Query params:

- `page?: number`
- `limit?: number`

Possible errors:

- `404` if meal does not exist

## Public Provider Endpoints

### `GET /api/providers`

Returns paginated providers.

Query params:

- `search?: string`
- `page?: number`, default `1`
- `limit?: number`, default `10`, max `100`
- `sortBy?: createdAt | updatedAt | shopName`, default `createdAt`
- `sortOrder?: asc | desc`, default `desc`

### `GET /api/providers/:id`

Returns one provider record by UUID.

Note:

- the current implementation returns provider fields only and does not include meals

## Provider Endpoints

All `/api/provider/*` routes require authentication because the router is mounted with `authenticate`.

### `POST /api/provider/profile`

Creates a provider profile for the authenticated user.

Body:

```json
{
  "shopName": "Spice House",
  "address": "Doha, Qatar",
  "shopImage": "https://example.com/shop.jpg"
}
```

Behavior:

- rejects if the user already has a provider profile
- updates the linked user's role to `PROVIDER`

### `GET /api/provider/meals`

Requires role `PROVIDER`.

Query params:

- `page?: number`, default `1`
- `limit?: number`, default `10`, max `100`

Returns only meals owned by the authenticated provider.

### `GET /api/provider/meals/:id`

Requires role `PROVIDER`.

Returns one provider-owned meal.

Possible errors:

- `404` if meal does not exist
- `403` if meal belongs to a different provider

### `POST /api/provider/meals`

Requires role `PROVIDER`.

Body:

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

Validation:

- `price` must be positive
- `dietary` must be `VEG`, `NON_VEG`, or `VEGAN`
- `categoryId` must be a valid UUID
- `availability` must be `AVAILABLE` or `UNAVAILABLE`

### `PATCH /api/provider/meals/:id`

Requires role `PROVIDER`.

Accepts any subset of:

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
- category must exist if `categoryId` is supplied
- provider can update only own meals

### `DELETE /api/provider/meals/:id`

Requires role `PROVIDER`.

Rules:

- provider can delete only own meals
- deletion can fail with `409` if the meal is already referenced by orders

### `GET /api/provider/orders`

Returns paginated orders belonging to the authenticated provider.

Query params:

- `page?: number`, default `1`
- `limit?: number`, default `10`, max `100`

### `PATCH /api/provider/orders/:id/status`

Current router state:

- the route exists
- UUID params and a body with `status` are validated
- the route is currently wired to `getOrdersByProvider` instead of `updateOrderStatus`

Intended body shape from service validation:

```json
{
  "status": "CONFIRMED"
}
```

Allowed next statuses in service logic:

- `CONFIRMED`
- `PREPARING`
- `READY`
- `DELIVERED`

Actual update behavior should be treated as incomplete until the route/controller wiring is corrected in code.

## Order Endpoints

All `/api/orders/*` routes require authentication.

### `POST /api/orders`

Creates an order for the authenticated user.

Body:

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
- meal ids must be unique inside the payload
- quantity must be a positive integer
- all meals must exist
- all meals must be available
- all meals must belong to the same provider

### `GET /api/orders`

Returns paginated orders for the authenticated user.

Query params:

- `page?: number`
- `limit?: number`

Possible errors:

- `401` if the user has not created any orders yet

### `GET /api/orders/:id`

Returns one order belonging to the authenticated user.

Possible errors:

- `404` if not found
- `403` if the order belongs to a different user

### `PATCH /api/orders/:id/cancel`

Cancels an order belonging to the authenticated user.

Allowed only when current status is:

- `PENDING`
- `CONFIRMED`

Possible errors:

- `409` if the order is no longer cancellable

## Review Endpoint

All `/api/reviews/*` routes require authentication.

### `POST /api/reviews`

Creates a review tied to a delivered order.

Body:

```json
{
  "mealId": "00000000-0000-0000-0000-000000000000",
  "orderId": "00000000-0000-0000-0000-000000000000",
  "rating": 5,
  "content": "Excellent meal and packaging."
}
```

Rules:

- rating must be an integer from `1` to `5`
- content must be 3 to 500 chars
- order must exist
- order must belong to the current user
- order must be `DELIVERED`
- meal must be part of that order
- duplicate review for the same user and meal is rejected

## Admin Category Endpoints

All `/api/admin/category/*` routes require authentication because the route group is mounted under `authenticate`.

### `GET /api/admin/category`

Returns all categories ordered by `createdAt desc`.

Current access behavior:

- any authenticated user can access this route

### `GET /api/admin/category/:id`

Returns one category by UUID.

Current access behavior:

- any authenticated user can access this route

### `POST /api/admin/category`

Requires role `ADMIN`.

Body:

```json
{
  "name": "Burgers"
}
```

### `PATCH /api/admin/category/:id`

Requires role `ADMIN`.

Body:

```json
{
  "name": "Wraps"
}
```

Rules:

- category must exist
- category name must remain unique

### `DELETE /api/admin/category/:id`

Requires role `ADMIN`.

Rules:

- category must exist
- category cannot be deleted while meals still use it

## Admin User Endpoints

All `/api/admin/users/*` routes require authentication and role `ADMIN` because the router is mounted with both `authenticate` and `authorize("ADMIN")`.

### `GET /api/admin/users`

Returns paginated users.

Query params:

- `page?: number`
- `limit?: number`

### `PATCH /api/admin/users/:id/status`

Current router behavior:

- this route uses `GET`
- it validates `params.id`
- it also validates a request body
- it performs a user status update

Body:

```json
{
  "status": "SUSPENDED"
}
```

Allowed values:

- `ACTIVE`
- `SUSPENDED`

Possible errors:

- `404` if user does not exist
- `409` if user already has the requested status
