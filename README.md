# CodeSmash

CodeSmash is a 1v1 coding game. You create a challenge, send the invite link to a friend, and you both solve the same problem while watching each other's code change live. Spectators can join and watch. Winning earns aura points, and the leaderboard ranks everyone by aura.

This repo holds both halves of the app:

- `client/` is the Next.js frontend: lobby, battle screen with the Monaco editor, profiles, leaderboard.
- `server/` is the Express and Socket.IO backend. It stores games and users in MongoDB, runs submitted code through Judge0, and uses Redis with BullMQ for game timers.

Each folder has its own README with setup steps and environment variables.

## Running it locally

You need Bun, pnpm, a MongoDB instance, a Redis instance, and a Judge0 endpoint (the RapidAPI one works, or run your own with `server/judge0/docker-compose.yml`).

Start the server first:

```bash
cd server
bun install
bun dev
```

Then the client, in another terminal:

```bash
cd client
pnpm install
pnpm dev
```

The client runs on http://localhost:3000. Point `NEXT_PUBLIC_API_BASE_URL` in the client at wherever the server is listening, and `CLIENT_BASE_URL` in the server back at the client.

## How a game works

1. The host creates a challenge and the game waits for a player.
2. A challenger opens the invite link and the game moves to the lobby.
3. The challenger marks ready, the host starts, and both get the same problem.
4. Each submission runs against the test cases on Judge0, and both players see the results.
5. The game ends when someone passes every test case or forfeits. If the timer runs out first, whoever passed more test cases wins, and an equal count is a draw.

`server/docs/game_flow.md` has the full state machine and the game schema.

## History

The client and server used to live in separate repos (`codesmash-client` and `codesmash-server`). Both histories were merged in here, so `git log` still goes back to the first commit of each.
