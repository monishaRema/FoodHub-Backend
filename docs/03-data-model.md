# Data Model

## Overview

The project uses PostgreSQL through Prisma with seven core models:

- `User`
- `Provider`
- `Category`
- `Meal`
- `Order`
- `OrderItem`
- `Review`

## Enums

### `UserRole`

- `CUSTOMER`
- `PROVIDER`
- `ADMIN`

### `UserStatus`

- `ACTIVE`
- `SUSPENDED`

### `DietaryType`

- `VEG`
- `NON_VEG`
- `VEGAN`

### `OrderStatus`

- `PENDING`
- `CONFIRMED`
- `PREPARING`
- `READY`
- `DELIVERED`
- `CANCELLED`

### `MealAvailability`

- `AVAILABLE`
- `UNAVAILABLE`

## Models

### `User`

Fields:

- `id: string`
- `name: string`
- `email: string` unique
- `passwordHash: string`
- `phone: string | null`
- `image: string | null`
- `role: UserRole` default `CUSTOMER`
- `status: UserStatus` default `ACTIVE`
- `createdAt: Date`
- `updatedAt: Date`

Relations:

- optional one-to-one `provider`
- one-to-many `orders`
- one-to-many `reviews`

### `Provider`

Fields:

- `id: string`
- `userId: string` unique
- `shopName: string`
- `address: string`
- `shopImage: string | null`
- `createdAt: Date`
- `updatedAt: Date`

Relations:

- belongs to `user`
- one-to-many `meals`
- one-to-many `orders`

Behavior:

- Creating a provider profile also updates the linked user's role to `PROVIDER`.

### `Category`

Fields:

- `id: string`
- `name: string` unique
- `createdAt: Date`
- `updatedAt: Date`

Relations:

- one-to-many `meals`

### `Meal`

Fields:

- `id: string`
- `providerId: string`
- `categoryId: string`
- `name: string`
- `image: string`
- `price: Decimal(10,2)`
- `dietary: DietaryType`
- `excerpt: string`
- `details: string`
- `isFeatured: boolean` default `false`
- `availability: MealAvailability` default `AVAILABLE`
- `createdAt: Date`
- `updatedAt: Date`

Relations:

- belongs to `provider`
- belongs to `category`
- one-to-many `orderItems`
- one-to-many `reviews`

Indexes:

- `providerId`
- `categoryId`
- `dietary`
- `availability`

### `Order`

Fields:

- `id: string`
- `userId: string`
- `providerId: string`
- `status: OrderStatus` default `PENDING`
- `totalAmount: Decimal(10,2)`
- `deliveryAddress: string`
- `contactPhone: string`
- `createdAt: Date`
- `updatedAt: Date`

Relations:

- belongs to `user`
- belongs to `provider`
- one-to-many `orderItems`
- one-to-many `reviews`

Indexes:

- `userId`
- `providerId`
- `status`
- `createdAt`

### `OrderItem`

Fields:

- `id: string`
- `orderId: string`
- `mealId: string`
- `mealNameSnapshot: string`
- `quantity: number`
- `price: Decimal(10,2)`
- `createdAt: Date`
- `updatedAt: Date`

Relations:

- belongs to `order`
- belongs to `meal`

Purpose:

- Preserves name and price snapshots for historical order integrity.

### `Review`

Fields:

- `id: string`
- `userId: string`
- `mealId: string`
- `orderId: string`
- `rating: number`
- `content: string`
- `createdAt: Date`
- `updatedAt: Date`

Relations:

- belongs to `user`
- belongs to `meal`
- belongs to `order`

Constraints:

- unique composite key on `userId + mealId`

## Relationship Summary

- One `User` may own one `Provider` profile.
- One `Provider` owns many `Meal` records.
- One `Category` groups many `Meal` records.
- One `Order` belongs to one `User` and one `Provider`.
- One `Order` contains many `OrderItem` rows.
- One `Review` links a user, a purchased meal, and the order it came from.
