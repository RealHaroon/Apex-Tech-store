# Apex Tech Store

Next.js 14 (App Router) + Tailwind CSS + Prisma (SQLite) storefront for Apex
Tech Store: a product catalog (with images) and cart/checkout (Cash on
Delivery or Bank Transfer), a separate service-request form for bookings
that don't go through the cart (setup & activation, PC repair, mentorship,
custom software), customer accounts (register/login, order & request
history), and a password-protected `/admin` panel to manage it all.

## Stack

- Next.js 14 App Router, TypeScript
- Tailwind CSS (colors/fonts configured in `tailwind.config.ts` to match the
  original navy/gold design in `files/`)
- Prisma 6 + SQLite (`prisma/schema.prisma`, `prisma/dev.db`)
- Zustand for client-side cart state (persisted to `localStorage`)
- Server Actions for checkout/service-request submission (`lib/actions/`),
  customer auth (`lib/actions/user-auth.ts`), and all admin mutations
  (`lib/actions/admin/`)
- Two independent, cookie-based auth systems, both stateless (HMAC-signed
  cookies, no session table):
  - **Admin** — a single shared password (`ADMIN_PASSWORD`), sized for a
    two-person shop, not a multi-admin system
  - **Customers** — real accounts (`User` model, bcrypt-hashed passwords),
    register/login at `/account`, orders and service requests placed while
    logged in are linked to that account
- Product images: an admin-set URL, or a local file uploaded to
  `public/uploads/products/` — falls back to a generic icon if neither is set

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

## Admin panel

Visit `/admin` and log in with `ADMIN_PASSWORD` (see `.env`). From there:

- **Dashboard** — product/order/request counts, recent activity
- **Products** — create, edit, delete (blocked if a product has past orders —
  mark it out of stock instead), toggle stock, assign category/icon/price
- **Categories** — create, rename, delete (blocked while it still has
  products)
- **Orders** — filter by status, view items/customer/payment method, update
  status (Pending → Confirmed → Fulfilled, or Cancelled)
- **Service requests** — filter by status, view details, update status (New →
  Contacted → Scheduled → Completed, or Cancelled)

Auth is a single shared password, not per-user accounts: `loginAdmin` checks
`ADMIN_PASSWORD` and sets an HTTP-only signed cookie (`lib/admin-auth.ts`,
HMAC-SHA256 over an expiry timestamp — no session table needed).
`middleware.ts` gates every `/admin/*` route except `/admin/login`, and each
admin Server Action also calls `requireAdmin()` itself
(`lib/require-admin.ts`) as a second check independent of routing.

**Before deploying anywhere public**, change `ADMIN_PASSWORD` in `.env` to
something only you know.

## Customer accounts

`/account/register` and `/account/login` create a real `User` row (bcrypt
password hash) and set a separate signed session cookie
(`lib/user-auth.ts` / `lib/actions/user-auth.ts`) — entirely independent of
the admin session. `/account` (gated by `middleware.ts`, same as `/admin`)
shows the logged-in customer's own order and service-request history.

Placing an order or service request while logged in automatically links it
to that account (`createOrder`/`createServiceRequest` read the session
server-side); logged-out (guest) checkout still works exactly as before and
just leaves `userId` null. Checkout also prefills name/email/phone from the
logged-in user's profile.

## Product images

In the admin product form, set an image either by pasting a URL or by
clicking "Upload from computer" (JPG/PNG/WEBP/GIF, 5MB max — validated in
`lib/actions/admin/upload.ts`). Uploaded files are written to
`public/uploads/products/` with a random filename; that folder is gitignored
since it's runtime data, not source. A product with no image falls back to
its category icon (`components/ProductThumb.tsx` picks whichever applies).

**Deployment note:** local upload writes to the filesystem, so it only
persists across restarts on a host with a persistent disk (e.g. a VPS or
Docker volume). On a serverless/ephemeral host (e.g. Vercel), use image URLs
instead, or swap the upload action for an object-storage provider (S3, R2,
etc.) — the admin form itself wouldn't need to change, just what
`uploadProductImage` does with the file.

## Environment

`.env` holds `DATABASE_URL`, `ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET`, and
`USER_SESSION_SECRET` (signs customer session cookies — separate secret from
the admin one, so one can be rotated without logging out the other). It's
gitignored — copy/create it yourself in a fresh clone; generate fresh
secrets with
`node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`.

## Project structure

- `app/(site)/` — the public storefront: `/`, `/shop`, `/shop/[slug]`,
  `/cart`, `/checkout` (+ `/checkout/confirmation/[orderNumber]`),
  `/services`, `/services/request` (+
  `/services/request/confirmation/[requestNumber]`), `/about`, `/contact`,
  `/account`, `/account/login`, `/account/register`. The `(site)` group just
  gives these pages the public Header/Footer without affecting the URLs.
- `app/admin/` — `login/` (no sidebar) and `(dashboard)/` (sidebar shell:
  dashboard, products, categories, orders, service-requests)
- `components/` — public site components (Header, Footer, ProductCard,
  ProductThumb, Button, icons, etc.) and `components/admin/` (sidebar,
  forms, tables)
- `lib/actions/` — `createOrder`, `createServiceRequest` (Server Actions,
  validated with zod, prices are re-looked-up server-side rather than
  trusted from the client), `user-auth.ts` (register/login/logout/
  getCurrentUser)
- `lib/actions/admin/` — admin CRUD Server Actions (categories, products,
  order/service-request status updates, image upload), each gated by
  `requireAdmin()`
- `lib/admin-auth.ts` + `lib/require-admin.ts` / `lib/user-auth.ts` +
  `lib/require-user.ts` — the two independent session cookie systems;
  `middleware.ts` gates both `/admin/*` and `/account/*` routes
- `lib/cart-store.ts` — Zustand cart store
- `prisma/schema.prisma` — `Category`, `Product` (with `imageUrl`), `User`,
  `Order`/`OrderItem` (with optional `userId`), `ServiceRequest` (with
  optional `userId`)
- `prisma/seed.ts` — seeds categories + the product catalog from the
  original `shop.html`
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
