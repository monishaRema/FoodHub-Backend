# FoodHub Backend

FoodHub Backend is a TypeScript + Express API for a multi-role meal ordering platform. It supports public meal browsing, customer ordering, provider operations, and admin management on top of PostgreSQL with Prisma.

## Overview

The API is mounted under `/api` and uses cookie-based JWT authentication for protected endpoints.

Roles used by the system:

- `CUSTOMER`
- `PROVIDER`
- `ADMIN`

Core business rules enforced in code:

- one order can contain meals from only one provider
- only `AVAILABLE` meals can be ordered
- duplicate meal ids in one order are rejected
- only delivered orders can be reviewed
- one user can review a meal only once
- provider order updates follow a strict status progression

## Current Capabilities

### Public

- health check via `GET /api/`
- register, login, logout, refresh token, and current-user lookup
- browse meals
- browse featured meals
- view a single meal
- view reviews for a meal
- browse providers
- view a single provider
- view meals offered by a provider

### Customer

- get current profile
- create orders
- list own orders
- read own order details
- cancel eligible orders
- check whether a meal is reviewable
- create reviews after delivery

### Provider

- create provider profile
- create, list, read, update, and delete own meals
- list provider orders
- update provider order status

### Admin

- list all orders
- read a single order
- list users
- update user status
- list categories
- read a single category
- create, update, and delete categories

## API Surface

Base path:

`/api`

Main route groups:

- auth: `/auth/*`
- public meals: `/meals/*`
- public providers: `/providers/*`
- provider area: `/provider/*`
- customer orders: `/orders/*`
- reviews: `/reviews/*`
- admin categories: `/admin/category/*`
- admin users: `/admin/users/*`
- admin orders: `/admin/orders/*`

## Authentication and Security

- JWT access and refresh tokens are stored in `httpOnly` cookies
- protected routes read the `access-token` cookie
- refresh uses the `refresh-token` cookie
- cookies use `sameSite: "strict"`
- cookies use `secure: true` only when `NODE_ENV=PROD`
- global rate limiter is enabled for all routes
- a second auth-specific rate limiter is enabled for `/api/auth/*`

Important implementation note:

- authentication middleware validates the token and role claims, but suspended-user checks are enforced during login and refresh rather than on every protected request

## Order Lifecycle

Provider progression:

`PENDING -> CONFIRMED -> PREPARING -> READY -> DELIVERED`

Customer cancellation:

- `PENDING -> CANCELLED`
- `CONFIRMED -> CANCELLED`

## Response Shape

Successful responses use:

```json
{
  "success": true,
  "message": "Operation completed",
  "data": {},
  "meta": {
    "page": 1,
    "limit": 10,
    "totalItems": 1,
    "totalPage": 1
  }
}
```

Error responses use:

```json
{
  "success": false,
  "message": "Validation failed",
  "errorDetails": [
    {
      "field": "email",
      "message": "Invalid email address"
    }
  ]
}
```

`meta` appears only on paginated endpoints.

## Environment Variables

Required runtime configuration in `.env`:

- `DATABASE_URL`
- `PORT`
- `NODE_ENV` as `DEV`, `PROD`, or `TEST`
- `JWT_ACCESS_TOKEN_SECRET`
- `JWT_REFRESH_TOKEN_SECRET`
- `JWT_ACCESS_TOKEN_EXPIRED_IN`
- `JWT_REFRESH_TOKEN_EXPIRED_IN`
- `BCRYPT_SALT_ROUNDS`
- `FRONTEND_URL`

## Getting Started

### Prerequisites

- Node.js
- pnpm
- PostgreSQL

### Install

```bash
pnpm install
```

### Prisma workflow

```bash
pnpm p:format
pnpm p:validate
pnpm p:gen
pnpm p:migrate
```

### Development

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

- `pnpm dev` runs the development server with `tsx watch`
- `pnpm type-check` runs TypeScript without emitting files
- `pnpm build` generates Prisma client and builds to `dist`
- `pnpm start` starts the compiled server
- `pnpm p:format` formats the Prisma schema
- `pnpm p:validate` validates the Prisma schema
- `pnpm p:gen` generates Prisma client
- `pnpm p:migrate` runs Prisma development migrations
- `pnpm p:reset` resets the database with Prisma migrations
- `pnpm p:deploy` deploys Prisma migrations
- `pnpm p:studio` opens Prisma Studio

## Project Docs

Detailed documentation lives in [docs](./docs):

- [01-project-overview.md](./docs/01-project-overview.md)
- [02-domains.md](./docs/02-domains.md)
- [03-data-model.md](./docs/03-data-model.md)
- [04-erd.png](./docs/04-erd.png)
- [05-api-overview.md](./docs/05-api-overview.md)
- [06-order-flow.md](./docs/06-order-flow.md)
- [07-tech-stack.md](./docs/07-tech-stack.md)
- [08-project-requirements.md](./docs/08-project-requirements.md)
- [09-api-documentation.md](./docs/09-api-documentation.md)

Suggested reading order:

1. [Project Overview](./docs/01-project-overview.md)
2. [Data Model](./docs/03-data-model.md)
3. [API Overview](./docs/05-api-overview.md)
4. [API Documentation](./docs/09-api-documentation.md)
