# MSA Trades Frontend

React + TypeScript storefront and admin dashboard for the MSA Trades eCommerce platform.

## Overview

The frontend is a Vite application that provides:

- Customer storefront pages for home, shop, category browsing, product details, cart, wishlist, checkout, order success, about, contact, privacy policy, and terms.
- Admin pages for login, dashboard, product management, category management, and order management.
- Redux Toolkit state for cart, wishlist, and admin session data.
- Axios clients for backend API communication.
- Tailwind CSS, Swiper, Framer Motion, Recharts, React Hook Form, and Yup for UI, animation, charts, and form handling.

## Tech Stack

- React 19
- TypeScript
- Vite
- React Router
- Redux Toolkit and Redux Persist
- Axios
- Tailwind CSS 4
- Framer Motion
- Swiper
- Recharts
- React Hook Form and Yup

## Project Structure

```text
msatrades_frontend/
+-- public/                     # Static public assets
+-- src/
|   +-- App.tsx                 # Application routes
|   +-- main.tsx                # React entry point
|   +-- Modules/
|   |   +-- Admin/              # Admin dashboard pages, layout, components, API utilities
|   |   +-- User/               # Customer pages, components, Redux store and slices
|   +-- assets/                 # Local media assets
|   +-- App.css
|   +-- index.css
+-- package.json
+-- vite.config.ts
+-- tsconfig*.json
```

## Prerequisites

- Node.js 18 or newer
- npm
- Running backend API, normally at `http://localhost:3000`

## Setup

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

Run linting:

```bash
npm run lint
```

## Backend API Configuration

The API base URLs are currently hardcoded:

- Admin API: `src/Modules/Admin/Utils/constant.ts`
- Service API: `src/Modules/Admin/Utils/Service/axios.ts`

Current values:

```ts
http://localhost:3000/api/v1/admin
http://localhost:3000/api/v1/service
```

If the backend runs on a different host or port, update these files before running the frontend.

## Main Routes

Customer routes:

- `/`
- `/about-us`
- `/contact`
- `/privacy-policy`
- `/terms-and-conditions`
- `/shop`
- `/shop/:categoryName`
- `/shop/:categoryName/:subcategoryName`
- `/product/:productName`
- `/cart`
- `/wishlist`
- `/checkout`
- `/order-success`

Admin routes:

- `/admin/login`
- `/admin/dashboard`
- `/admin/orders`
- `/admin/products`
- `/admin/category`
- `/admin/addproducts`
- `/admin/productdetail`
- `/admin/orderdetail`
- `/admin/productedit`
- `/admin/categoryadd`
- `/admin/categoryedit`

Admin routes are wrapped with `ProtectedRoute`.

## Development Notes

- The app uses lazy-loaded pages through `React.lazy` and `Suspense`.
- Cart, wishlist, and admin state are managed under `src/Modules/User/Redux`.
- Product and category static data/types are located in `src/Modules/products.ts` and `src/Modules/categories.ts`.
- Local video assets for the homepage hero are stored in `src/assets`.
