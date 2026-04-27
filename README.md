# FoodHub Backend

FoodHub Backend is a TypeScript and Express API for a multi-role meal ordering platform. It supports public meal browsing, customer ordering, provider meal management, and admin moderation features on top of a PostgreSQL database with Prisma.

## Overview

The backend is organized around three roles:

- `CUSTOMER`
- `PROVIDER`
- `ADMIN`

Core business rules enforced by the project:

- one order belongs to one provider
- meals are provider-owned
- only delivered orders can be reviewed
- one user can review a meal only once
- order status follows a strict lifecycle

## Current Capabilities

### Public

- health check
- register and login
- browse meals
- view a single meal
- view reviews for a meal
- browse providers
- view a single provider

### Customer

- get current profile
- create orders
- list own orders
- read own order details
- cancel eligible orders
- create reviews after delivery

### Provider

- create provider profile
- create, list, read, update, and delete own meals
- list provider orders
- update provider order status

### Admin

- list users
- update user status
- list categories
- read one category
- create, update, and delete categories

## API Overview

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

Authentication and authorization:

- JWT-based authentication
- tokens are stored in `httpOnly` cookies
- protected routes use the `access-token` cookie
- role checks are enforced with middleware

## Order Lifecycle

Provider progression:

`PENDING -> CONFIRMED -> PREPARING -> READY -> DELIVERED`

Customer cancellation:

- `PENDING -> CANCELLED`
- `CONFIRMED -> CANCELLED`

## Response Shape

Successful responses use this shape:

```json
{
  "success": true,
  "message": "Operation completed",
  "data": {}
}
```

Validation and application errors use this shape:

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

## Tech Stack

### Runtime and Framework

- Node.js
- Express 5
- TypeScript

### Database

- PostgreSQL
- Prisma ORM
- `@prisma/adapter-pg`

### Auth, Validation, and Security

- `jsonwebtoken`
- `bcryptjs`
- `zod`
- `helmet`
- `cors`
- `cookie-parser`
- `express-rate-limit`

### Tooling

- `tsx`
- `dotenv`
- `pnpm`

Architecture style:

- modular monolith
- layered flow: `route -> controller -> service -> repository`

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

Set these values in `.env` before starting the app:

- `DATABASE_URL`
- `PORT`
- `NODE_ENV`
- `JWT_ACCESS_TOKEN_SECRET`
- `JWT_REFRESH_TOKEN_SECRET`
- `JWT_ACCESS_TOKEN_EXPIRED_IN`
- `JWT_REFRESH_TOKEN_EXPIRED_IN`
- `BCRYPT_SALT_ROUNDS`
- `FRONTEND_URL`

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

- `pnpm dev` - run the development server with `tsx watch`
- `pnpm type-check` - run TypeScript without emitting files
- `pnpm build` - build the project into `dist`
- `pnpm start` - start the built server
- `pnpm p:format` - format the Prisma schema
- `pnpm p:validate` - validate the Prisma schema
- `pnpm p:gen` - generate Prisma client
- `pnpm p:migrate` - run Prisma development migrations
- `pnpm p:reset` - reset the database with Prisma migrations
- `pnpm p:deploy` - deploy Prisma migrations
- `pnpm p:studio` - open Prisma Studio

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
- [09-api-documentation.md](./docs/09-api-documentation.md)

## Suggested Reading Order

1. [Project Overview](./docs/01-project-overview.md)
2. [Data Model](./docs/03-data-model.md)
3. [API Overview](./docs/05-api-overview.md)
4. [API Documentation](./docs/09-api-documentation.md)

## Goal

This project is intended to demonstrate practical RBAC, real-world order lifecycle handling, modular backend structure, and a solid full-stack-ready API foundation.
