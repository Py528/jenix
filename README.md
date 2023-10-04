# AI SaaS Platform with Next.js 13, React, Tailwind, Prisma, Stripe

## Prerequisites

- **Node.js version 18.x.x** (Make sure you have Node.js installed).

## Getting Started

### Clone the Repository

```shell
git clone https://github.com/AntonioErdeljac/next13-ai-saas.git
```

### Install Dependencies

```shell
npm install
```

### Setup Environment Variables

Create a `.env` file in the project root directory and add the following environment variables:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

OPENAI_API_KEY=
REPLICATE_API_TOKEN=

DATABASE_URL=

STRIPE_API_KEY=
STRIPE_WEBHOOK_SECRET=

NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### Setup Prisma

Add a MySQL Database (e.g., PlanetScale) and apply database migrations:

```shell
npx prisma db push
```

### Start the App

```shell
npm run dev
```

## Available Commands

Run the following commands using npm:

- `npm run dev`: Starts a development instance of the app.
