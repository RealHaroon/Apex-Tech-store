# Apex Tech Store

Next.js 14 (App Router) + Tailwind CSS + Prisma (SQLite) storefront for Apex
Tech Store: a product catalog with cart/checkout (Cash on Delivery or Bank
Transfer), plus a separate service-request form for bookings that don't go
through the cart (setup & activation, PC repair, mentorship, custom
software).

## Stack

- Next.js 14 App Router, TypeScript
- Tailwind CSS (colors/fonts configured in `tailwind.config.ts` to match the
  original navy/gold design in `files/`)
- Prisma 6 + SQLite (`prisma/schema.prisma`, `prisma/dev.db`)
- Zustand for client-side cart state (persisted to `localStorage`)
- Server Actions for order + service-request submission (`lib/actions/`)

## Getting started

```bash
npm install
npm run db:push    # creates prisma/dev.db from the schema
npm run db:seed    # seeds the product catalog
npm run dev
```

Open http://localhost:3000.

Other scripts: `npm run build`, `npm run start`, `npm run lint`,
`npm run db:studio` (Prisma Studio).

## Environment

`.env` holds `DATABASE_URL="file:./dev.db"`. It's gitignored — copy/create it
yourself in a fresh clone.

## Project structure

- `app/` — routes: `/`, `/shop`, `/shop/[slug]`, `/cart`, `/checkout` (+
  `/checkout/confirmation/[orderNumber]`), `/services`,
  `/services/request` (+ `/services/request/confirmation/[requestNumber]`),
  `/about`, `/contact`
- `components/` — Header, Footer, ProductCard, Button, icons, etc.
- `lib/actions/` — `createOrder`, `createServiceRequest` (Server Actions,
  validated with zod, prices are re-looked-up server-side rather than
  trusted from the client)
- `lib/cart-store.ts` — Zustand cart store
- `prisma/schema.prisma` — `Product`, `Order`/`OrderItem`, `ServiceRequest`
- `prisma/seed.ts` — seeds the product catalog from the original `shop.html`
- `files/` — the original static HTML/CSS design this app was built from
  (kept for reference; not part of the Next.js app)

## Known environment quirk

This repo lives under a path containing a literal colon
(`.../Local Disk (D:)/...`). Colons are the `PATH` delimiter on Linux, so
`npm run <script>` cannot resolve binaries like `next`/`prisma`/`tsx` by name
— every script in `package.json` invokes them via an explicit
`node node_modules/<pkg>/...` path instead of the bare command name to work
around this. If you ever move the project to a colon-free path, both styles
keep working, so no changes are needed either way.
