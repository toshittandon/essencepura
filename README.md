# Terra Botanica E-commerce

A modern e-commerce application built with React, featuring Stripe payment integration, user authentication, and a complete shopping experience.

## Features

### 🛍️ Shopping Experience
- **Product Catalog**: Browse products with detailed information, images, and reviews
- **Individual Product Pages**: Full product details with ingredients, benefits, and customer reviews
- **Shopping Cart**: Add/remove items, adjust quantities, and view totals
- **Responsive Design**: Optimized for desktop and mobile devices

### 👤 User Management
- **User Authentication**: Login/logout functionality with persistent sessions
- **Profile Page**: View user details, order history, and account management
- **Order Tracking**: View past orders with status and details

### 💳 Payment Integration
- **Stripe Integration**: Secure payment processing with Stripe
- **Checkout Flow**: Complete checkout process with address and payment forms
- **Payment Confirmation**: Success pages and order confirmation

### 🎨 Modern UI/UX
- **Shadcn/UI Components**: Beautiful, accessible UI components
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Responsive Navigation**: Mobile-friendly navigation with cart indicators

## Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/UI** - High-quality UI components
- **Stripe React** - Stripe payment components
- **Lucide React** - Beautiful icons

### Backend
- **Express.js** - Node.js web framework
- **Stripe API** - Payment processing
- **CORS** - Cross-origin resource sharing

### State Management
- **React Context** - For cart and user state
- **Local Storage** - Persistent cart and user data

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Stripe account for payment processing

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd terra-botanica
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   # Stripe Configuration
   VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here
   STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
   
   # Backend URL
   VITE_API_URL=http://localhost:3001
   ```

4. **Get Stripe Keys**
   - Sign up at [Stripe](https://stripe.com)
   - Get your test keys from the Stripe Dashboard
   - Replace the placeholder keys in `.env`

### Running the Application

#### Development Mode (Frontend + Backend)
```bash
npm run dev:full
```
This runs both the React frontend (port 5173) and Express backend (port 3001).

#### Frontend Only
```bash
npm run dev
```

#### Backend Only
```bash
npm run server
```

### Building for Production
```bash
npm run build
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Shadcn/UI components
│   ├── Header.jsx      # Navigation header
│   ├── Footer.jsx      # Site footer
│   ├── ProductCard.jsx # Product display card
│   └── CheckoutForm.jsx # Stripe checkout form
├── contexts/           # React contexts for state management
│   ├── CartContext.jsx # Shopping cart state
│   └── UserContext.jsx # User authentication state
├── data/              # Static data and mock data
│   └── products.js    # Product catalog data
├── lib/               # Utility libraries
│   └── stripe.js      # Stripe configuration
├── pages/             # Page components
│   ├── Index.jsx      # Home page
│   ├── Shop.jsx       # Product listing
│   ├── ProductDetail.jsx # Individual product page
│   ├── Cart.jsx       # Shopping cart
│   ├── Checkout.jsx   # Checkout process
│   ├── Profile.jsx    # User profile
│   ├── Login.jsx      # User login
│   └── PaymentSuccess.jsx # Payment confirmation
└── App.jsx            # Main app component with routing
```

## Key Features Implementation

### 1. Shopping Cart
- Persistent cart using localStorage
- Add/remove items with quantity controls
- Real-time total calculations
- Cart indicator in header

### 2. User Authentication
- Mock authentication system (easily replaceable with real auth)
- Protected routes for checkout and profile
- Persistent login sessions

### 3. Stripe Integration
- Secure payment processing
- Payment intents for better security
- Webhook support for order confirmation
- Error handling and loading states

### 4. Product Management
- Detailed product pages with reviews
- Product categories and filtering
- Image galleries and product benefits
- Ingredient listings

## API Endpoints

### Backend Endpoints
- `POST /create-checkout-session` - Create Stripe payment intent
- `POST /webhook` - Handle Stripe webhooks
- `GET /health` - Health check endpoint

## Customization

### Adding New Products
Edit `src/data/products.js` to add new products with the following structure:
```javascript
{
  id: "unique-id",
  name: "Product Name",
  price: 99.99,
  image: "/path/to/image.jpg",
  category: "Category",
  description: "Product description",
  ingredients: ["Ingredient 1", "Ingredient 2"],
  benefits: ["Benefit 1", "Benefit 2"],
  isNew: false,
  isBestseller: false
}
```

### Styling
- Modify `tailwind.config.js` for theme customization
- Update CSS variables in `src/index.css`
- Customize component styles in individual component files

### Authentication
Replace the mock authentication in `UserContext.jsx` with your preferred auth solution:
- Firebase Auth
- Auth0
- Custom JWT implementation
- Supabase Auth

## Deployment

### Frontend (Vercel/Netlify)
1. Build the project: `npm run build`
2. Deploy the `dist` folder
3. Set environment variables in your hosting platform

### Backend (Railway/Heroku)
1. Deploy `server.js` to your preferred platform
2. Set environment variables including Stripe keys
3. Update `VITE_API_URL` to point to your deployed backend

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For questions or issues:
1. Check the documentation
2. Review existing issues
3. Create a new issue with detailed information

---

Built with ❤️ using React, Stripe, and modern web technologies.