# CodeSmash client

The frontend for CodeSmash, built with Next.js 15 (App Router), React 19, and Tailwind CSS 4. Components come from shadcn/ui on top of Radix. The battle screen uses the Monaco editor, and live updates come over Socket.IO from the server in `../server`.

## Setup

```bash
pnpm install
pnpm dev
```

The app runs on http://localhost:3000. It needs the server running to do anything useful.

Create `.env.local` with:

```
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

`NEXT_PUBLIC_API_BASE_URL` is where the server is listening. `NEXT_PUBLIC_APP_URL` is this app's own URL, which the login flow uses as the redirect target after Google sign-in.

## Scripts

- `pnpm dev` starts the dev server with Turbopack.
- `pnpm build` makes a production build.
- `pnpm start` serves that build.
- `pnpm lint` runs ESLint.

## Where things are

- `app/` has the routes. `lobby` lists open challenges and live battles, `battle/[gameId]` is the game itself, and `leaderboard`, `profile`, and `user` cover the rest.
- `components/` has the UI, with shadcn primitives in `components/ui`.
- `context/` holds the Socket.IO providers that keep both players' editors in sync.
- `lib/api/` has the fetch helpers for the server's REST routes, and `lib/validations/` has the Zod schemas that check what comes back.
