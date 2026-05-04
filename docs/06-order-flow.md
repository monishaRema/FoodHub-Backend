# Order Flow

## Creation Rules

When a customer creates an order:

1. Every submitted `mealId` must exist.
2. Duplicate meal ids are rejected.
3. Every meal must be `AVAILABLE`.
4. All meals must belong to the same provider.
5. `totalAmount` is calculated from database prices, not trusted from client input.
6. Order items store meal name and price snapshots.

## Order Status Lifecycle

Primary lifecycle:

`PENDING -> CONFIRMED -> PREPARING -> READY -> DELIVERED`

Cancellation:

- `PENDING -> CANCELLED`
- `CONFIRMED -> CANCELLED`

## Provider Status Transitions

Allowed transitions:

- `PENDING -> CONFIRMED`
- `CONFIRMED -> PREPARING`
- `PREPARING -> READY`
- `READY -> DELIVERED`

Disallowed:

- skipping forward
- moving backward
- changing `DELIVERED`
- changing `CANCELLED`

## Customer Permissions

- create own orders
- list own orders
- read own orders
- cancel own orders only while status is `PENDING` or `CONFIRMED`

Current implementation quirk:

- if the user has no orders, `GET /api/orders` currently returns `401` with an error message instead of an empty paginated response

## Provider Permissions

- view orders belonging to their own provider account
- progress order status only through the allowed transition map

## Review Dependency

A review can be created only if:

- the order belongs to the current user
- the order status is `DELIVERED`
- the reviewed meal was included in the order
- the user has not already reviewed that meal

The project also exposes `GET /api/reviews/eligibility/:id` so the client can check whether the current user may review a specific meal.
