# Data Model

## Overview

The system is built around a relational model with clear ownership and role separation.

---

## Core Entities

### User
Represents all system users.

- role: CUSTOMER | PROVIDER | ADMIN
- status: ACTIVE | SUSPENDED

Relations:
- One-to-one with Provider (optional)
- One-to-many with Orders
- One-to-many with Reviews

---

### Provider
Represents a seller profile.

- Linked to a User
- Owns multiple Meals
- Handles Orders

---

### Category
Represents meal classification.

- Flat structure (no nesting in MVP)

---

### Meal
Represents a provider-specific menu item.

- Owned by a Provider
- Belongs to a Category
- Has dietary type and availability status

Note:
Same meal name can exist across multiple providers as separate records.

---

### Order
Represents a customer purchase.

- Belongs to a User (customer)
- Belongs to a Provider
- Contains multiple OrderItems
- Stores delivery snapshot data

---

### OrderItem
Represents individual items inside an order.

- Links Order and Meal
- Stores quantity and price at order time
- Stores meal snapshot for consistency

---

### Review
Represents feedback for a meal.

- Linked to User, Meal, and Order
- One user can review a meal only once

---

## Relationships Summary

- User → Provider (1:1)
- Provider → Meals (1:N)
- User → Orders (1:N)
- Provider → Orders (1:N)
- Order → OrderItems (1:N)
- Meal → OrderItems (1:N)
- Meal → Reviews (1:N)
- User → Reviews (1:N)