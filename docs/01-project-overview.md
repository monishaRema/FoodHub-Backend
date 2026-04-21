# FoodHub — Multi-Role Meal Ordering Platform

## Overview

FoodHub is a full-stack meal ordering platform where customers can browse meals, place orders, and leave reviews, while providers manage their menus and fulfill orders. An admin panel allows system-wide control over users, categories, and orders.

The system is designed as a role-based marketplace with three actors:

- Customer (buyer)
- Provider (seller)
- Admin (system controller)

## Core Features

### Customer
- Browse meals and providers
- Filter meals by category, dietary type, and price
- Add items to cart
- Place orders (Cash on Delivery)
- Track order status
- Leave reviews after purchase

### Provider
- Manage menu (add/update/delete meals)
- View incoming orders
- Update order status

### Admin
- View and manage all users
- Suspend or activate users
- Manage categories
- Monitor all orders

## Key Business Rules

- One order belongs to one provider
- Meals are provider-owned (no shared catalog)
- Only verified customers can review meals
- Order status follows a strict lifecycle
- Suspended users cannot perform protected actions

## Goals

- Demonstrate clean backend architecture
- Implement role-based access control (RBAC)
- Model real-world order lifecycle
- Build a recruiter-ready full-stack project