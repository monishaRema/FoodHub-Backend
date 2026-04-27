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

## Provider Status Transitions in Service Logic

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

- Create own orders
- List own orders
- Read own orders
- Cancel own orders only while status is `PENDING` or `CONFIRMED`

## Provider Permissions

- View orders belonging to their own provider account
- Progress order status only through the allowed transition map in service logic

## Review Dependency

A review can be created only if:

- the order belongs to the current user
- the order status is `DELIVERED`
- the reviewed meal was included in the order

## Current Route Wiring Note

The provider service contains status-update rules, but the route registration for `/api/provider/orders/:id/status` is currently not connected to `updateOrderStatus`. This document describes both the intended service behavior and the current routing state.
