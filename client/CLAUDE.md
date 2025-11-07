# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

CodeSmash is a real-time 1v1 coding platform built with Next.js 15, TypeScript, and Tailwind CSS. Players compete by solving coding problems in real-time duels with live code synchronization and Monaco Editor integration.

## Development Commands

- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build production bundle with Turbopack
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm install` - Install dependencies

## TypeScript Guidelines

- **Strict TypeScript**: Always use proper TypeScript types, never use `any`
- **Type Safety**: Prefer explicit typing over type inference where clarity is needed
- **Interfaces**: Use interfaces for object shapes and component props
- **Generics**: Utilize generics for reusable components and functions
- **Type Guards**: Implement proper type checking for runtime safety

## Architecture

### Core Application Structure

- **App Router**: Uses Next.js 15 App Router with strict TypeScript
- **Styling**: Tailwind CSS v4 with custom design system
- **UI Components**: Radix UI primitives with custom styling
- **State Management**: React Context with properly typed providers
- **Real-time**: WebSocket connections for live duels and code sync

### Server Integration

#### Backend Server Communication
**Server Location**: `../server/` (Express.js + Socket.IO)
**Server Port**: 8000 (configured via `NEXT_PUBLIC_API_BASE_URL`)
**Database**: MongoDB via server API

#### API Integration Strategy
1. **Server-Side Rendering**: Use Server Components for initial data fetching
2. **Real-time Updates**: Use Client Components with WebSocket connections
3. **Type Safety**: Zod schemas validate server responses

#### API Endpoints Used
```typescript
// Server API endpoints this client integrates with
POST /api/games              # Create new game
GET  /api/games/:gameId      # Get single game details
GET  /api/users/:userId/challenges  # Get user's challenges
```

#### Integration Files
- **`lib/api/game.ts`**: Server API client functions
- **`lib/validations/game.ts`**: Zod schemas matching server types
- **`lib/config.ts`**: Server endpoint configuration
- **`context/websocket-context.tsx`**: Socket.IO client integration

#### Server-Client Data Flow
```
1. Server Component fetches initial data via API
2. Client Component receives data as props
3. WebSocket connects for real-time updates
4. UI reflects both initial data and real-time changes
```

#### Type Safety Between Client-Server
```typescript
// Client Zod schema matches server TypeScript interface
export const gameDataSchema = z.object({
  _id: z.string(),
  hostId: z.string(),
  status: gameStatusSchema,
  // ... matches server IGame interface
})
```

### Directory Structure

#### `app/` - Next.js App Router
- **Purpose**: Contains all route pages and layouts using App Router convention
- **Key Files**:
  - `layout.tsx` - Root layout with theme provider and fonts
  - `page.tsx` - Landing page
  - `duel/page.tsx` - Main duel interface
  - `lobby/page.tsx` - Matchmaking and lobby
  - `live-battles/page.tsx` - Active battles overview
  - `open-challenges/page.tsx` - Available challenges

#### `components/` - React Components
- **Purpose**: Organized component library split by feature domains

- **`ui/`** - Base UI Components
  - Reusable design system components (Button, Dialog, Card, etc.)
  - Built on Radix UI primitives with Tailwind styling
  - Type-safe prop interfaces for all components

- **`duel/`** - Duel-Specific Components
  - `monaco-editor.tsx` - Monaco Editor wrapper with custom theme
  - `code-editor.tsx` - High-level editor component
  - `problem-panel.tsx` - Problem statement display
  - `output-terminal.tsx` - Code execution results
  - `duel-controls.tsx` - Submit/run/forfeit controls
  - `battle-navbar.tsx` - Duel session navigation

- **`lobby/`** - Lobby & Matchmaking Components
  - `matchmaking-dialog.tsx` - Queue management interface
  - `challenge-dialog.tsx` - Create challenge modal
  - `live-battles.tsx` - Active duels display
  - `open-challenges.tsx` - Available challenges list

#### `context/` - React Context Providers
- **Purpose**: Global state management with properly typed contexts
- **`duel-context.tsx`** - Combines duel session and code sync state
- Provides typed hooks for consuming context data

#### `hooks/` - Custom React Hooks
- **Purpose**: Business logic and side effects management
- **`use-duel-session.ts`** - Duel lifecycle, player status, timer management
- **`use-code-sync.ts`** - Real-time code synchronization between players
- **`use-websocket.ts`** - WebSocket connection management
- **Monaco Editor theme integration** - Moved to `monaco-editor.tsx` component

#### `lib/` - Utility Functions
- **Purpose**: Shared utilities and helper functions
- **`utils.ts`** - Common utility functions with proper typing

### Real-time System Architecture

The application uses WebSocket connections for real-time features with strict typing:

- **DuelContext**: Manages duel state and code synchronization with typed interfaces
- **WebSocket Integration**: Type-safe message handling for real-time communication
- **State Synchronization**: Ensures consistent state across connected clients
- **Player Management**: Tracks connection status, typing indicators, and game state

#### Game Timer System Integration

The client integrates with the server's BullMQ + Redis timer system for precise game time expiration:

**WebSocket Events Handled:**
```typescript
// Time expiration event (from server)
socket.on("game_time_expired", (data: {
  gameId: string
  result: {
    reason: "time_up"
    winner: string
    message: string
  }
  completedAt: Date
  status: "completed"
}) => {
  setGameStatus("completed")
  setGameResult(data.result)
  toast.error("Time's Up!", {
    description: data.result.message,
    duration: 5000
  })
})

// Timer sync event (optional, prevents client drift)
socket.on("timer_sync", (data: {
  remaining: number
  serverTime: number
}) => {
  // Update local timer display
})

// Request time sync (client → server)
socket.emit("request_time_remaining")
```

**Integration Location:** `context/game-websocket-context.tsx`

**Key Features:**
- Automatic game end when time expires
- Toast notification on expiration
- Updates game store with completion result
- Optional periodic sync to prevent timer drift

For detailed timer architecture, see `../CLAUDE.md` → "Game Timer System" section.

### Code Editor Integration

Monaco Editor integration with comprehensive TypeScript support:

- Custom "CodeSmashDark" theme with GitHub-inspired styling
- Real-time collaborative editing with proper conflict resolution
- Language support with syntax highlighting and IntelliSense
- Read-only opponent view with visual differentiation

### UI System & Design

- **Design System**: Built on Radix UI with Tailwind CSS
- **Theme System**: Light/dark mode with `next-themes` integration
- **Typography**: Geist Sans (UI) and Geist Mono (code) font families
- **Component Architecture**: Consistent patterns following shadcn/ui conventions
- **Responsive Design**: Mobile-first approach with breakpoint consistency

## Development Notes

- **Package Manager**: Use `pnpm` for all dependency management
- **Build System**: Turbopack for fast development and production builds
- **WebSocket Server**: Expected at `ws://localhost:3001` for local development
- **Client-Side Rendering**: Monaco Editor and WebSocket connections require CSR
- **Animation**: Framer Motion for smooth transitions and interactions
- **Analytics**: Vercel Analytics integrated for production usage tracking
- **Type Checking**: Run TypeScript compiler checks before commits

## Proper TypeScript Usage

### TypeScript Check after doing the work
- After completing your work, You must **only** run TypeScript compilation using the exact command:

```bash
npx tsc
```
- Do **not** add any extra flags (e.g., `--noEmit`, `--watch`, `--incremental`, etc.).  
- Do **not** run or suggest running any dev servers (e.g., `npm run dev`, `yarn dev`, `pnpm dev`, `next dev`, etc.)

### Absolute TypeScript Rule: No `any` Allowed

You must **NEVER** use `any` in TypeScript.  
This includes, but is not limited to:

## ❌ Disallowed Usages
Direct type annotations:  
  ```ts
  let x: any
```

Function parameters or return types:

  ```ts
  function foo(bar: any): any {}
  ```
Type assertions:

  ```ts
  value as any
  ```
Mapped or indexed types:

  ```ts
  Record<string, any>
  { [key: string]: any }
  ```
Generic defaults:

  ```ts
  <T = any>
  ```
* Utility types involving `any`.
* Higher-order functions (`.map()`, `.forEach()`, `.reduce()`, `.filter()`, etc.):

  ```ts
  array.map((item: any) => ...)
  array.forEach((el: any) => ...)
  ```

## ✅ Correct Alternatives

* If the type is unknown → use `unknown`.
* If you know the structure → define an explicit `interface` or `type`.
* If TypeScript can infer it → omit the type and let inference work.

  ```ts
  array.map(item => ...) // inferred
  ```
* For generic placeholders → write a generic properly:

  ```ts
  function identity<T>(arg: T): T { return arg }
  ```

## ⚠️ Enforcement

* `any` in **any form** is forbidden.
* You must **not** use `(item: any)` in array methods or callbacks.
* You must **not** fall back to `any` even temporarily.

Your output must be **100% free of `any`** in all situations.

## Code Style Guidelines
- Uses pnpm as package manager
- Path aliases configured: `@/*` maps to `./src/*`
- ESLint configuration extends Next.js core-web-vitals and TypeScript rules
- Tailwind classes follow utility-first approach with dark mode support
- Components use functional syntax with hooks (useState, useTransition)
- always use kebab-case for file names\
- write modular code so it is clean and maintanable but at the same time dont overengineer

# Code Checking
- When you do your task in a frontend app, just run strictly `npx tsc` without any flags to check for typescript errors and fix them if present\
- Avoid the use of the type `any` in all cases


# CSS Variable Usage

Always use CSS variables through Tailwind classes instead of hardcoded colors. The project uses a comprehensive design system with the following color variables:

### Primary Colors
- `bg-background` / `text-foreground` - Main page background and default text color
- `bg-card` / `text-card-foreground` - Card/panel backgrounds and text
- `bg-popover` / `text-popover-foreground` - Popup/modal backgrounds and text

### Interactive Colors
- `bg-primary` / `text-primary-foreground` - Primary action buttons and highlights
- `bg-secondary` / `text-secondary-foreground` - Secondary actions and subtle emphasis
- `bg-accent` / `text-accent-foreground` - Accent elements and hover states
- `text-primary` - Primary text color for links and important content

### Muted Colors
- `bg-muted` / `text-muted-foreground` - Subtle backgrounds and secondary text
- `text-muted-foreground` - Placeholder text, captions, and less important content

### Status Colors  
- `bg-destructive` / `text-destructive-foreground` - Error states and destructive actions
- `text-destructive` - Error text and warnings

### Borders and Inputs
- `border-border` - Standard border color that adapts to theme
- `bg-input` - Input field backgrounds
- `ring-ring` - Focus ring color

### Example Usage
```tsx
// ✅ Correct - uses CSS variables
<div className="bg-card text-card-foreground border-border">
  <h1 className="text-foreground">Title</h1>
  <p className="text-muted-foreground">Description</p>
  <button className="bg-primary text-primary-foreground">Action</button>
</div>

// ❌ Incorrect - hardcoded colors
<div className="bg-white dark:bg-gray-900 text-black dark:text-white">
  <h1 className="text-gray-900 dark:text-gray-100">Title</h1>
</div>
```

## Page Metadata

**IMPORTANT: Every page must export proper metadata for SEO and browser tabs.**

### Metadata Configuration

The root layout (`app/layout.tsx`) uses a metadata template:

```typescript
export const metadata: Metadata = {
  title: {
    template: "%s | CodeSmash",
    default: "CodeSmash - 1v1 Coding Platform",
  },
  description: "Challenge your friends in real-time coding duels...",
}
```

### Page-Level Metadata

Every page component should export metadata:

```typescript
// Server Component (no "use client")
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Page Title",  // Will become "Page Title | CodeSmash"
  description: "Clear, SEO-friendly description of the page content",
}

export default function Page() {
  // Component code
}
```

### Client Components & Metadata

**Rule**: Client components (those using `"use client"`) cannot export metadata.

**Solutions**:
1. Create a parent `layout.tsx` file with metadata
2. Use a server component wrapper
3. Let the parent route segment handle metadata

### Dynamic Metadata

For dynamic routes, use `generateMetadata`:

```typescript
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = await fetchData(params.id)
  
  return {
    title: data.title,
    description: data.description,
  }
}
```

### Metadata Best Practices

1. **Title**: Keep it concise and descriptive (50-60 characters)
2. **Description**: 150-160 characters, describes page purpose clearly
3. **Consistency**: All pages should have both title and description
4. **SEO**: Use keywords naturally, avoid keyword stuffing
5. **User-Friendly**: Titles appear in browser tabs and bookmarks

## Skeleton Loading States

**IMPORTANT: ALWAYS create skeleton loading states for any page that fetches data. This is mandatory for good UX.**

Always create appropriate skeleton loaders for pages that require data fetching to provide a smooth user experience. Use the Skeleton component and create loading.tsx files in the same directory as page.tsx files.

### Guidelines for Skeleton Loaders

1. **File Structure**: Create `loading.tsx` files in the same directory as the corresponding `page.tsx`
2. **Shape Matching**: Skeleton elements should closely resemble the final content layout
3. **Responsive Design**: Ensure skeletons work across all screen sizes
4. **Animation**: Use the built-in `animate-pulse` class for subtle loading animation
5. **Semantic Structure**: Maintain proper HTML structure even in loading states

### Skeleton Component Usage

Use the base Skeleton component from `@/components/ui/skeleton`:

```tsx
import { Skeleton } from '@/components/ui/skeleton';

// Basic usage
<Skeleton className="h-4 w-full" />
<Skeleton className="h-8 w-48 rounded-full" />

// Complex layout example
<div className="space-y-4">
  <Skeleton className="h-12 w-3/4" />
  <div className="space-y-2">
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-4 w-5/6" />
  </div>
</div>
```

### Common Skeleton Patterns

1. **Card Skeletons**: Match card layouts with image, title, and content areas
2. **List Skeletons**: Repeat skeleton items for list views
3. **Form Skeletons**: Include input field and button placeholders
4. **Navigation Skeletons**: Show menu structure during load

### Implementation Examples

```tsx
// Table skeleton for problems list
export default function ProblemsLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Skeleton className="h-9 w-64 mb-6" />
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">Status</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Difficulty</TableHead>
              <TableHead>Tags</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 8 }).map((_, index) => (
              <TableRow key={index}>
                <TableCell><Skeleton className="w-5 h-5 rounded-full" /></TableCell>
                <TableCell><Skeleton className="h-5 w-48" /></TableCell>
                <TableCell><Skeleton className="h-6 w-16 rounded-full" /></TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    <Skeleton className="h-5 w-12 rounded-full" />
                    <Skeleton className="h-5 w-20 rounded-full" />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
```
