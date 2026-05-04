# Domain Breakdown

## 1. Identity and Access

Files:

- `src/app/modules/auth/*`
- `src/app/middleware/authenticate.middleware.ts`
- `src/app/middleware/authorize.middleware.ts`

Responsibilities:

- user registration
- login and logout
- access-token refresh
- current-user lookup
- cookie-based authentication
- role-based authorization

Implementation notes:

- Registration creates a user with role `CUSTOMER` by default.
- Login stores `access-token` and `refresh-token` in `httpOnly` cookies.
- Protected routes depend on the `access-token` cookie.
- Login and refresh reject users whose status is not `ACTIVE`.

## 2. Public Catalog

Files:

- `src/app/modules/meal/*`
- `src/app/modules/providers/*`

Responsibilities:

- browse available meals
- browse featured meals
- search meals by free text
- view meal details
- view meal reviews
- browse providers
- view provider details
- list meals by provider

Implementation notes:

- Public meal listing only returns meals with `availability = AVAILABLE`.
- Featured meals also require `availability = AVAILABLE`.
- Meal search matches against `name`, `excerpt`, `details`, and dietary enum text when the search value matches an enum.
- Public provider detail returns provider fields only.
- Provider meals are exposed through a dedicated `GET /api/providers/:id/meals` endpoint.

## 3. Provider Operations

Files:

- `src/app/modules/provider/*`

Responsibilities:

- provider profile registration
- provider-owned meal CRUD
- provider order listing
- provider order status progression

Implementation notes:

- A user becomes a provider by creating a provider profile.
- Provider meal routes require both authentication and `PROVIDER` role.
- Provider order routes sit under the authenticated `/api/provider` mount.
- Order status transitions are strictly enforced in service logic.

## 4. Ordering

Files:

- `src/app/modules/order/*`

Responsibilities:

- order creation
- customer order history
- single-order lookup
- customer order cancellation

Implementation notes:

- Orders are restricted to meals from exactly one provider.
- Total amount is calculated from database prices, not client input.
- Order items store meal name and price snapshots.
- If a user has no orders, the current service returns a `401` instead of an empty list.

## 5. Reviews

Files:

- `src/app/modules/review/*`

Responsibilities:

- review creation tied to completed purchases
- review eligibility checking

Implementation notes:

- Review creation requires authentication.
- The order must belong to the current user.
- The order must be `DELIVERED`.
- The reviewed meal must be part of the order.
- Only one review per user per meal is allowed.
- Eligibility check returns an informative `eligibility` result instead of throwing for normal ineligible states.

## 6. Admin Governance

Files:

- `src/app/modules/user/*`
- `src/app/modules/category/*`
- `src/app/modules/admin-orders/*`

Responsibilities:

- user listing
- user status changes
- category CRUD
- platform-wide order visibility

Implementation notes:

- User-management routes are mounted under `/api/admin/users`.
- Category routes are mounted under `/api/admin/category`.
- Admin order routes are mounted under `/api/admin/orders`.
- Category creation, update, and deletion are admin-only.
- Category listing is accessible to any authenticated user because the route lacks an `authorize("ADMIN")` guard.
