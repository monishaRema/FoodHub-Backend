# Project Requirements Coverage

## Scope Reflected by the Current Backend

This document maps the implemented backend to the project goals visible in the repository.

## Implemented Core Areas

### Authentication

- User registration
- User login
- User logout
- Refresh-token flow
- Current-user lookup
- Cookie-based protected routes

### Public browsing

- Meal list with search, pagination, and sorting
- Meal details
- Meal review listing
- Provider list with search, pagination, and sorting
- Provider details

### Customer ordering

- Create orders
- List own orders
- Read own order details
- Cancel eligible orders

### Reviews

- Create review after delivered order
- Prevent duplicate review per user and meal

### Provider operations

- Register provider profile
- Create meal
- List own meals
- Read own single meal
- Update own meal
- Delete own meal
- List provider orders

### Admin operations

- List users
- Change user status
- List categories
- Read single category
- Create category
- Update category
- Delete category when unused

## Gaps Between Existing Docs and Actual Code

The previous markdown set described a broader or slightly different API than what is currently implemented. The codebase today does not include:

- `/api/v1` base routing
- admin order endpoints
- cart endpoints
- provider-profile meal listing on public provider detail
- category, price, or dietary filters on the public meals endpoint
- frontend page routes

## Important Implementation Quirks to Know

- A user becomes a provider by calling `POST /api/provider/profile`; registration itself does not accept a role selector.
- Suspended-user enforcement is implemented at login and refresh time, but there is no global middleware that blocks every protected action after authentication.
- Category read endpoints are available to any authenticated user because only the mutating category routes use `authorize("ADMIN")`.
- User-status update and provider-order-status update routes are not using conventional HTTP method wiring in the current router.

## Recommended Reading Order

1. `01-project-overview.md`
2. `03-data-model.md`
3. `05-api-overview.md`
4. `09-api-documention.md`
