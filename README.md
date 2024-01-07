# Hot N' Fast Website

<div align="center">
     <img src="https://img.shields.io/badge/-Next_JS-black?style=for-the-badge&logoColor=white&logo=nextdotjs&color=000000" alt="nextdotjs" />
    <img src="https://img.shields.io/badge/-TypeScript-black?style=for-the-badge&logoColor=white&logo=typescript&color=3178C6" alt="typescript" />
    <img src="https://img.shields.io/badge/-Tailwind_CSS-black?style=for-the-badge&logoColor=white&logo=tailwindcss&color=06B6D4" alt="tailwindcss" />
    <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white"/>
    <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white"/>
</div>

## Overview

This is a full-stack CRUD application I created for an imaginary fast-food restaurant named **"Hot N' Fast"**. The reason I am creating this website is to get my hands dirty and get a feel for the full-stack development process. **<u>NOTE:</u>** I used the similar products as **McDonalds** to populate my menu. There are going to be 3 pages for menu: **Breakfast, Sandwiches & Wraps and Snacks & Sides**

## ⚙️ Tech Stack used for this website</u>

This is the tech stack I used for this project. It was inspired by the [T3 stack](https://create.t3.gg), namely:

- Next.js
- TailwindCSS
- TypeScript
- Prisma
- NextAuth.js
- Zustand State Management
- React Query

Additionally, I used PostgreSQL (namely [**Vercel Postgres**](https://vercel.com/docs/storage/vercel-postgres)) as the database.

## 🧰 Features

- **Product browsing.** Explore 3 categories of products (Breakfast, Burgers & Wraps, Snacks & sides)
- **User authentication and authorization.** Utilized NextAuth.js to ensure secure access to user-specific features. There are 2 roles; admin and customer
- **Cart Management.** Used Zustand state management to update the cart
- **Add/delete/update products.** Admins can perform CRUD operations to maintain the store. I also utilized [Cloudinary](https://cloudinary.com/ip/gr-sea-gg-brand-home-base?utm_source=google&utm_medium=search&utm_campaign=goog_selfserve_brand_wk22_replicate_core_branded_keyword&utm_term=1329&campaignid=18164753405&adgroupid=144188713167&keyword=cloudinary&device=c&matchtype=e&adposition=&gad_source=1&gclid=Cj0KCQiAkeSsBhDUARIsAK3tiecEmNFiQWNcxmHocapFxs2-h0Fe9dUTJOYPYdRahe1lUJsE3FobfskaAqv5EALw_wcB) to store product images in the cloud
- **Online payments via Stripe API.** Customers can perform mock payments using the fake credentials [here](#💳-testing-the-stripe-api).


## 🔑 Admin and Customer Accounts

Here is the credentials to log in to the test admin account and see the admin-specific features:

**Email**: `demo@example.com` \
**Password**: `demo1234`

To view the screen for a regular customer, you can sign up and create an account yourself OR use the following credentials for a test customer:

**Email**: `test@example.com` \
**Password**: `testing123`

## 💳 Testing the Stripe API

To test the Stripe API, you can use the following credentials:

**Card Number:** `4242 4242 4242 4242` \
**Expiration Date:** Can be anything as long as the expiration year is NOT in the past. \
**CVC:** Can be anything \
**Address form:** You can fill the address form with an abitrary address 


<!-- This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details. -->
