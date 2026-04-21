# FoodHub Backend

FoodHub Backend is a TypeScript and Express API for a multi-role meal ordering platform. It supports customers placing orders, providers managing menus and fulfillment, and admins overseeing users, categories, and orders.

## Overview

The backend is designed as a role-based marketplace with three core actors:

- Customer
- Provider
- Admin

Key business rules:

- One order belongs to one provider
- Meals are provider-owned
- Only verified customers can review meals
- Order status follows a strict lifecycle
- Suspended users cannot perform protected actions

## Core Features

### Customer

- Browse meals and providers
- Filter meals by category, dietary type, and price
- Place orders with Cash on Delivery
- Track order status
- Leave reviews after purchase

### Provider

- Manage menu items
- View incoming orders
- Update order status through the order lifecycle

### Admin

- Manage users
- Suspend or activate accounts
- Manage categories
- Monitor platform orders

## Domain Structure

The backend is organized around these responsibility areas:

- Identity & Access
- Catalog
- Cart & Checkout
- Orders
- Reviews
- Admin Governance

## Data Model

Main entities in the system:

- `User`
- `Provider`
- `Category`
- `Meal`
- `Order`
- `OrderItem`
- `Review`

Relationship highlights:

- A `User` may have one `Provider` profile
- A `Provider` owns many `Meal` records
- An `Order` belongs to one customer and one provider
- An `Order` contains many `OrderItem` records
- A `Review` links a user, meal, and order

For the ERD and full model notes, see the docs section below.

## Order Lifecycle

The order flow is enforced in the backend:

`PENDING -> CONFIRMED -> PREPARING -> READY -> DELIVERED`

Cancellation rule:

`PENDING -> CANCELLED`

Lifecycle constraints:

- No skipped states
- No invalid transitions
- Customer can cancel only while order is `PENDING`
- Provider advances the order through valid states
- Admin can override when necessary

## API Overview

Base path:

`/api/v1`

Main route groups:

- Auth: `/auth/register`, `/auth/login`, `/auth/logout`, `/auth/me`
- Public: `/meals`, `/meals/:id`, `/providers`, `/providers/:id`
- Customer: `/orders`, `/orders/:id`, `/reviews`
- Provider: `/provider/meals`, `/provider/orders`, `/provider/orders/:id/status`
- Admin: `/admin/users`, `/admin/orders`, `/admin/categories`

Authentication and authorization:

- JWT-based authentication
- Token stored in an `httpOnly` cookie
- Role-based access control for `CUSTOMER`, `PROVIDER`, and `ADMIN`

## Tech Stack

### Backend

- Node.js
- Express 5
- TypeScript

### Database

- PostgreSQL
- Prisma ORM

### Auth, Validation, and Security

- `jsonwebtoken`
- `bcrypt` / `bcryptjs`
- `zod`
- `helmet`
- `cors`
- `express-rate-limit`

### Development Tooling

- `tsx`
- Prisma CLI
- `dotenv`
- `pnpm`

Architecture style:

- Modular monolith
- Layered flow: Route -> Controller -> Service -> Repository

## Getting Started

### Prerequisites

- Node.js
- pnpm
- PostgreSQL

### Install dependencies

```bash
pnpm install
```

### Configure environment

Create and update your environment variables in `.env` before running the server and database commands.

### Prisma workflow

```bash
pnpm p:format
pnpm p:validate
pnpm p:gen
pnpm p:migrate
```

### Run in development

```bash
pnpm dev
```

### Type-check

```bash
pnpm type-check
```

### Build and start

```bash
pnpm build
pnpm start
```

### Prisma utilities

```bash
pnpm p:deploy
pnpm p:studio
```

## Available Scripts

- `pnpm dev` - Run the development server with `tsx watch`
- `pnpm type-check` - Run TypeScript without emitting files
- `pnpm build` - Build the project into `dist`
- `pnpm start` - Start the built server
- `pnpm p:format` - Format the Prisma schema
- `pnpm p:validate` - Validate the Prisma schema
- `pnpm p:gen` - Generate Prisma client
- `pnpm p:migrate` - Run Prisma development migrations
- `pnpm p:deploy` - Deploy Prisma migrations
- `pnpm p:studio` - Open Prisma Studio

## Project Docs

Detailed project documentation lives in [docs](./docs):

- [01-project-overview.md](./docs/01-project-overview.md)
- [02-domains.md](./docs/02-domains.md)
- [03-data-model.md](./docs/03-data-model.md)
- [04-erd.png](./docs/04-erd.png)
- [05-api-overview.md](./docs/05-api-overview.md)
- [06-order-flow.md](./docs/06-order-flow.md)
- [07-tech-stack.md](./docs/07-tech-stack.md)
- [08-project-requirements.md](./docs/08-project-requirements.md)

## Goal

This project is aimed at demonstrating clean backend architecture, practical RBAC, real-world order lifecycle modeling, and a recruiter-ready full-stack backend foundation.
