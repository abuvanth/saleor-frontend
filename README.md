# Saleor Frontend - Modern E-commerce Store

A modern, responsive e-commerce frontend built with Next.js, TypeScript, and Tailwind CSS, designed to work with the Saleor GraphQL API. Inspired by modern e-commerce design patterns similar to HyraBuy.com.

## Features

- 🛍️ **Modern E-commerce Experience**: Clean, responsive design with smooth animations
- 🔍 **Product Search & Categories**: Advanced filtering and categorization
- 🛒 **Shopping Cart**: Persistent cart with Zustand state management
- 📱 **Mobile-First Design**: Fully responsive across all devices
- ⚡ **Performance Optimized**: Built with Next.js 14 and optimized images
- 🎨 **Beautiful UI**: Tailwind CSS with custom animations and components
- 🔗 **Saleor Integration**: Full GraphQL integration with Saleor backend
- 🍞 **Toast Notifications**: User-friendly feedback with react-hot-toast

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **GraphQL Client**: Apollo Client
- **UI Components**: Headless UI
- **Icons**: Heroicons
- **Notifications**: React Hot Toast

## Prerequisites

- Node.js 18+ 
- npm or yarn or pnpm
- A running Saleor backend instance

## Getting Started

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd saleor-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Configure environment variables**
   
   Copy the `.env.local` file and update the Saleor API URL:
   ```bash
   # Update .env.local with your Saleor backend URL
   SALEOR_API_URL=https://your-saleor-instance.com/graphql/
   NEXT_PUBLIC_SALEOR_API_URL=https://your-saleor-instance.com/graphql/
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## Saleor Backend Setup

This frontend requires a Saleor backend. You can either:

1. **Use Saleor Cloud**: Sign up at [saleor.io](https://saleor.io)
2. **Run Saleor locally**: Follow the [Saleor documentation](https://docs.saleor.io)
3. **Use Saleor demo**: `https://demo.saleor.io/graphql/`

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── products/          # Products pages
├── components/            # Reusable UI components
│   ├── Header.tsx         # Navigation header
│   ├── Footer.tsx         # Site footer
│   ├── Hero.tsx           # Hero section
│   ├── ProductCard.tsx    # Product display card
│   ├── Cart.tsx           # Shopping cart sidebar
│   └── ...
├── lib/                   # Utilities and configurations
│   ├── apollo.ts          # Apollo Client setup
│   └── queries.ts         # GraphQL queries
├── store/                 # State management
│   └── cart.tsx           # Cart store with Zustand
├── styles/                # Global styles
│   └── globals.css        # Tailwind CSS imports
└── types/                 # TypeScript type definitions
```

## Key Components

### Hero Section
Modern hero section with gradient background and call-to-action buttons.

### Product Grid
Responsive product grid with hover effects and add-to-cart functionality.

### Shopping Cart
Slide-out cart with quantity controls and persistent state.

### Category Navigation
Intuitive category browsing with visual category cards.

### Search & Filter
Advanced product search and filtering capabilities.

## GraphQL Queries

The application uses optimized GraphQL queries for:
- Featured products
- Product details
- Categories
- Search results
- Product variants

## Customization

### Styling
- Modify `tailwind.config.js` for custom colors and themes
- Update `src/styles/globals.css` for global styles
- Component styles are inline with Tailwind classes

### Branding
- Update the logo and brand name in `Header.tsx`
- Modify colors in the Tailwind config
- Replace placeholder images with your brand assets

### Features
- Add new pages in the `app/` directory
- Create new components in `components/`
- Extend GraphQL queries in `lib/queries.ts`

## Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms
The app can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## Performance

- Image optimization with Next.js Image component
- Code splitting with Next.js App Router
- Lazy loading for components
- Optimized GraphQL queries
- Persistent cart state

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For questions and support:
- Check the [Saleor documentation](https://docs.saleor.io)
- Visit the [Next.js documentation](https://nextjs.org/docs)
- Create an issue in this repository
