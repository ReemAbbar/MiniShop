This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Features

- 🛍️ **SHEIN-Style E-commerce Interface** - Modern, clean design with black theme
- 🛒 **Shopping Cart** - Add/remove products with localStorage persistence
- 💳 **Stripe Payment Integration** - Secure checkout with Stripe Checkout
- 📱 **Responsive Design** - Mobile-friendly interface
- 🔍 **Product Filtering** - Filter by category, price, and rating
- ✨ **Smooth Animations** - Toast notifications and loading states

## Getting Started

### Prerequisites

- Node.js 18+ installed
- A Stripe account (get one at [stripe.com](https://stripe.com))

### Installation

1. Clone the repository:
```bash
git clone https://github.com/ReemAbbar/MiniShop.git
cd mini-inventory-tracker
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
   - Copy `.env.example` to `.env.local`
   - Add your Stripe API keys (see Stripe Setup below)

4. Run the development server:

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

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Stripe Setup

This project uses Stripe for secure payment processing. Follow these steps to set up Stripe:

### 1. Get Your Stripe API Keys

1. Sign up for a free account at [stripe.com](https://stripe.com)
2. Go to the [Stripe Dashboard](https://dashboard.stripe.com/test/apikeys)
3. Copy your **Publishable key** (starts with `pk_test_`)
4. Copy your **Secret key** (starts with `sk_test_`)

### 2. Configure Environment Variables

Create a `.env.local` file in the root directory:

```bash
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
```

⚠️ **Important**: Never commit `.env.local` to version control. It's already in `.gitignore`.

### 3. Test the Payment Flow

Use Stripe's test card numbers:
- **Success**: `4242 4242 4242 4242`
- **Decline**: `4000 0000 0000 0002`
- Use any future expiry date (e.g., `12/34`)
- Use any 3-digit CVC (e.g., `123`)
- Use any ZIP code

### 4. Webhook Setup (For Production)

For handling post-payment events:
1. Go to [Stripe Webhooks](https://dashboard.stripe.com/test/webhooks)
2. Add endpoint: `https://yourdomain.com/api/webhook`
3. Select events: `checkout.session.completed`
4. Add webhook secret to `.env.local`

See `STRIPE_SETUP.md` for detailed documentation.

## Project Structure

```
mini-inventory-tracker/
├── app/
│   ├── api/
│   │   └── checkout/         # Stripe checkout API route
│   ├── cart/                 # Shopping cart page
│   ├── success/              # Payment success page
│   └── page.js               # Home page
├── components/               # React components
│   ├── AddProductModal.jsx
│   ├── FilterBar.jsx
│   ├── Navbar.jsx
│   ├── ProductCard.jsx
│   └── ...
├── hooks/                    # Custom React hooks
│   ├── useCart.js
│   ├── useProducts.js
│   └── useProductFilters.js
├── lib/
│   └── stripe.js            # Stripe client initialization
└── .env.local               # Environment variables (create this)
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Technologies Used

- **Next.js 15.5** - React framework with App Router
- **React 19** - UI library
- **Stripe** - Payment processing
- **Tailwind CSS** - Styling (SHEIN-inspired design)
- **LocalStorage** - Cart persistence

## License

MIT License - feel free to use this project for learning or commercial purposes.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
