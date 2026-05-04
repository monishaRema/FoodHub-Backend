# Project Requirements Coverage

## Scope Reflected by the Current Backend

This document maps the implemented backend to the project goals visible in the repository.

## Implemented Core Areas

### Authentication

- user registration
- user login
- user logout
- refresh-token flow
- current-user lookup
- cookie-based protected routes

### Public browsing

- meal list with search, pagination, and sorting
- featured meal list
- meal details
- meal review listing
- provider list with search, pagination, and sorting
- provider details
- provider meal listing

### Customer ordering

- create orders
- list own orders
- read own order details
- cancel eligible orders

### Reviews

- create review after delivered order
- check review eligibility by meal
- prevent duplicate review per user and meal

### Provider operations

- register provider profile
- create meal
- list own meals
- read own single meal
- update own meal
- delete own meal
- list provider orders
- update provider order status

### Admin operations

- list all orders
- read single order
- list users
- change user status
- list categories
- read single category
- create category
- update category
- delete category when unused

## Important Implementation Notes

- A user becomes a provider by calling `POST /api/provider/profile`; registration itself does not accept a role selector.
- Suspended-user enforcement is implemented at login and refresh time, but there is no global middleware that blocks every protected action after authentication.
- `GET /api/admin/category` is available to any authenticated user because only the mount-level `authenticate` middleware applies there.
- `GET /api/orders` currently returns `401` when the user has not created any orders yet.

## Out of Scope in the Current Backend

The codebase today does not include:

- `/api/v1` base routing
- cart endpoints
- payment processing
- delivery assignment or tracking
- wishlist or favorites
- admin mutations for orders
- public category endpoints
- frontend page routes

## Recommended Reading Order

1. `01-project-overview.md`
2. `03-data-model.md`
3. `05-api-overview.md`
4. `09-api-documentation.md`
