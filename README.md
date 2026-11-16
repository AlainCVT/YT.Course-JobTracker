# Job Tracker

Job Tracker is a full-stack job application management app built with Next.js. It helps users organize, track, and update their job search using a visual Kanban board, making it easier to manage every stage from initial interest to final offer.

## Overview

The project is designed for individuals who want a simple and modern way to keep track of their applications without juggling spreadsheets or scattered notes. Each user has a personalized dashboard with boards, columns, and job application cards that can be moved across the hiring pipeline as status changes.

This app includes authentication, persistent MongoDB storage, drag-and-drop interactions, and a polished dashboard UI built with React, Tailwind CSS, and shadcn-style components.

## Features

- Secure sign-up and sign-in flow with Better Auth
- Personalized job tracking board per user
- Customizable columns for each stage of the hiring process
- Drag-and-drop job cards between columns
- Create, update, and delete job applications
- Track application progress visually with a Kanban board
- Auto-generated default board layout on first sign-up
- MongoDB-backed persistence for users, boards, and applications
- Responsive UI optimized for desktop and smaller screens
- Seed script to generate sample user and application data for testing

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- MongoDB + Mongoose
- Better Auth
- dnd-kit for drag-and-drop interactions
- Tailwind CSS
- shadcn/ui-inspired component system
- Playwright for end-to-end tests

## Getting Started

### 1. Install dependencies

```bash
pnpm install
```

### 2. Configure environment variables

Create a `.env.local` file at the project root and add the required values:

```bash
MONGODB_URI=mongodb://localhost:27017/job-tracker
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000
```

Notes:

- `MONGODB_URI` is required for the app database connection.
- `NEXT_PUBLIC_BETTER_AUTH_URL` is used by the front-end auth client.

### 3. Run the app locally

```bash
pnpm dev
```

Then open http://localhost:3000 in your browser.

## Default workflow

When a new user signs up, the app automatically creates a default board with these columns:

- Wish List
- Applied
- Interviewing
- Offer
- Rejected

This gives the user a ready-to-use job tracking system without needing manual setup.

## Scripts

```bash
pnpm dev           # run the app in development mode
pnpm build         # create a production build
pnpm start         # run the production build
pnpm seed          # seed a demo user and job applications
pnpm test          # run the unit test suite
pnpm test:e2e      # run Playwright end-to-end tests
pnpm lint          # run ESLint
pnpm lint:fix      # auto-fix lint issues
```

## Testing

### Unit tests

```bash
pnpm test
```

### End-to-end tests

```bash
pnpm exec playwright install chromium
pnpm test:e2e
```

The Playwright suite expects a working local environment and a valid MongoDB connection.

## Project Structure

```text
app/                 # Next.js app router pages and route handlers
components/         # Reusable UI and board components
contexts/           # Dashboard and theme state providers
lib/                # Database, auth, and business logic
models/             # Mongoose models and typing
public/             # Static assets
scripts/            # Seeding and utility scripts
tests/              # Unit and E2E tests
```

## Why this project

This repository is a practical example of a modern full-stack productivity app built with the latest Next.js and React patterns. It combines real-world user authentication, persistent data storage, and a polished interactive interface in one application.

## License

This project is intended for learning and personal use. If you plan to use it for production or commercial purposes, review the licensing of the included dependencies and adjust any relevant project policies before deployment.

## Credits

[NextJS 16 Full Course 2026 | Build and Deploy A Production Ready Job Application Tracker w/ MongoDB](https://www.youtube.com/watch?v=vCIsrOGNhas)
