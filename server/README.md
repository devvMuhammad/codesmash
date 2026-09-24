# CodeSmash server

The backend for CodeSmash. It's an Express 5 app running on Bun, with Socket.IO for the live parts of a game. MongoDB (through Mongoose) stores users, games, problems, and feedback. Better Auth handles sign-in with Google. Redis backs BullMQ, which runs the game timers.

Submitted code goes to Judge0, which runs it against the problem's test cases. JavaScript, Python, Java, and C++ are supported.

## Setup

```bash
bun install
bun dev
```

`bun dev` runs `index.ts` in watch mode. The server reads `.env.dev`, or `.env.prod` when `NODE_ENV=production`:

```
PORT=8000
CLIENT_BASE_URL=http://localhost:3000
MONGODB_URI=mongodb://localhost:27017/codesmash

REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

JUDGE0_URL=
RAPIDAPI_KEY=
RAPIDAPI_HOST=
```

The server won't start if `PORT`, `CLIENT_BASE_URL`, `MONGODB_URI`, the Redis host and port, or the Judge0 variables are missing.

## Judge0

You can use the hosted Judge0 on RapidAPI, which is what the `RAPIDAPI_*` variables are for. To run it yourself instead:

```bash
cd judge0
docker compose up -d
```

That starts Judge0 1.13.1 on port 2358 with its own Postgres and Redis. The containers run privileged, and the images are amd64 only, so on an Apple Silicon Mac they go through emulation.

## Problems

There are three problems so far: Two Sum, Longest Substring Without Repeating Characters, and Trapping Rain Water. `problems/<slug>/` has a reference solution for each one in all four languages. To seed the database:

```bash
bun run scripts/seedTwoSum.ts
bun run scripts/insertProblems.ts
```

`seedTwoSum.ts` adds Two Sum, and `insertProblems.ts` adds the other two, skipping any that already exist. `scripts/updatePythonCodes.ts` rewrites the Python starter code on problems that are already in the database.

## Layout

- `index.ts` sets up Express, Better Auth, and the Socket.IO events (joining, ready, start, code updates, forfeits).
- `auth.ts` configures Better Auth.
- `src/routes` and `src/controllers` hold the REST API under `/api`: games, users, problems, feedback.
- `src/services` has the Judge0 client, the aura scoring, the in-memory code store, and the BullMQ timer queue.
- `src/models` has the Mongoose schemas.
- `docs/` has notes on the game flow and on how starter code gets generated.

## Aura

A win is worth 3 aura. A loss costs 1 and a forfeit costs 2. Each test case you pass for the first time in a game adds 1. The values are in `src/services/auraService.ts`.
