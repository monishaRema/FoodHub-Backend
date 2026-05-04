# Tech Stack

## Runtime and Framework

- Node.js
- Express `5.2.1`
- TypeScript `6`

## Database Layer

- PostgreSQL
- Prisma `7.7.0`
- `@prisma/adapter-pg`
- generated Prisma client in `generated/prisma`

## Authentication and Security

- `jsonwebtoken`
- `bcryptjs`
- `cookie-parser`
- `helmet`
- `cors`
- `express-rate-limit`

Implementation notes:

- JWTs are transported in cookies rather than bearer headers.
- `cors` is configured with `origin: config.FRONTEND_URL` and `credentials: true`.
- A global limiter and a second auth-specific limiter are both active in `src/app/app.ts`.

## Validation

- `zod`

## Tooling

- `tsx`
- `pnpm`
- `dotenv`

## Architecture

The project follows a modular layered backend structure:

`route -> controller -> service -> repository`

Shared support layers:

- `config`
- `middleware`
- `shared/lib`
- `shared/utils`
- `shared/validation`

## Key Source Locations

- app bootstrap: `src/app/app.ts`
- server entry: `src/app/server.ts`
- router mount: `src/app/router/index.ts`
- schema: `prisma/schema.prisma`
- migrations: `prisma/migrations`
