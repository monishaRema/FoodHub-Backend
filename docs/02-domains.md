# Domain Breakdown

## 1. Identity and Access

Files:

- `src/app/modules/auth/*`
- `src/app/middleware/authenticate.middleware.ts`
- `src/app/middleware/authorize.middleware.ts`

Responsibilities:

- User registration
- Login and logout
- Access-token refresh
- Current-user lookup
- Cookie-based authentication
- Role-based authorization

Implementation notes:

- Registration creates a user with role `CUSTOMER` by default.
- Login stores `access-token` and `refresh-token` in `httpOnly` cookies.
- Protected routes depend on the `access-token` cookie.

## 2. Public Catalog

Files:

- `src/app/modules/meal/*`
- `src/app/modules/providers/*`

Responsibilities:

- Browse available meals
- Search meals by free text
- View meal details
- View meal reviews
- Browse providers
- View provider details

Implementation notes:

- Public meal listing only returns meals with `availability = AVAILABLE`.
- Meal search matches against `name`, `excerpt`, `details`, and dietary enum text.
- Public provider lookup currently returns provider records only; it does not include the provider's meals.

## 3. Provider Operations

Files:

- `src/app/modules/provider/*`

Responsibilities:

- Provider profile registration
- Provider-owned meal CRUD
- Provider order listing
- Order status progression logic

Implementation notes:

- A user becomes a provider by creating a provider profile.
- Provider meal access is scoped by the authenticated user's provider record.
- The service contains valid status-transition rules, but the route/controller wiring for order-status update is currently inconsistent.

## 4. Ordering

Files:

- `src/app/modules/order/*`

Responsibilities:

- Order creation
- Customer order history
- Single-order lookup
- Customer order cancellation

Implementation notes:

- Orders are restricted to meals from exactly one provider.
- Total amount is calculated from meal prices stored in the database.
- Order items store snapshot values for meal name and price.

## 5. Reviews

Files:

- `src/app/modules/review/*`

Responsibilities:

- Review creation tied to completed purchases

Implementation notes:

- Review creation requires authentication.
- The order must belong to the current user.
- The order must be `DELIVERED`.
- The reviewed meal must be part of the order.
- Only one review per user per meal is allowed.

## 6. Admin Governance

Files:

- `src/app/modules/user/*`
- `src/app/modules/category/*`

Responsibilities:

- User listing
- User status changes
- Category CRUD

Implementation notes:

- User-management routes are mounted under `/api/admin/users`.
- Category routes are mounted under `/api/admin/category`.
- Category create, update, and delete are admin-only.
- Category reads are authenticated but not admin-only in the current router.
