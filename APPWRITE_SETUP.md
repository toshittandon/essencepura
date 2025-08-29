# Appwrite Integration Setup Guide

This guide will help you set up Appwrite for user authentication and product management in your Terra Botanica e-commerce application.

## 🚀 Quick Start

### 1. Create Appwrite Account
1. Go to [Appwrite Cloud](https://cloud.appwrite.io) or set up self-hosted Appwrite
2. Create a new account or sign in
3. Create a new project

### 2. Configure Environment Variables
Update your `.env` file with your Appwrite project details:

```env
# Appwrite Configuration
VITE_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT_ID=your-project-id-here
VITE_APPWRITE_DATABASE_ID=your-database-id-here
VITE_APPWRITE_PRODUCTS_COLLECTION_ID=your-products-collection-id-here
VITE_APPWRITE_STORAGE_BUCKET_ID=your-storage-bucket-id-here
```

### 3. Set Up Authentication

#### Enable Email/Password Authentication:
1. Go to your Appwrite console
2. Navigate to **Auth** → **Settings**
3. Enable **Email/Password** authentication method
4. Configure your app's domain in **Platforms** → **Web**

### 4. Create Database and Collections

#### Create Database:
1. Go to **Databases** in your Appwrite console
2. Click **Create Database**
3. Name it `terra-botanica` (or your preferred name)
4. Copy the Database ID to your `.env` file

#### Create Products Collection:
1. Inside your database, click **Create Collection**
2. Name it `products`
3. Copy the Collection ID to your `.env` file

#### Configure Products Collection Attributes:
Add these attributes to your products collection:

| Attribute | Type | Size | Required | Default | Array |
|-----------|------|------|----------|---------|-------|
| `name` | String | 255 | ✅ | - | ❌ |
| `description` | String | 1000 | ✅ | - | ❌ |
| `price` | Double | - | ✅ | - | ❌ |
| `originalPrice` | Double | - | ❌ | - | ❌ |
| `category` | String | 100 | ✅ | - | ❌ |
| `stock` | Integer | - | ❌ | 0 | ❌ |
| `image` | String | 500 | ❌ | - | ❌ |
| `imageFileId` | String | 100 | ❌ | - | ❌ |
| `ingredients` | String | 50 | ❌ | - | ✅ |
| `benefits` | String | 50 | ❌ | - | ✅ |
| `isBestseller` | Boolean | - | ❌ | false | ❌ |
| `isNew` | Boolean | - | ❌ | false | ❌ |

#### Set Collection Permissions:
1. Go to **Settings** tab in your products collection
2. Set these permissions:
   - **Read**: `any` (allow anyone to read products)
   - **Create**: `users` (only authenticated users can create - for admin)
   - **Update**: `users` (only authenticated users can update - for admin)
   - **Delete**: `users` (only authenticated users can delete - for admin)

### 5. Set Up File Storage

#### Create Storage Bucket:
1. Go to **Storage** in your Appwrite console
2. Click **Create Bucket**
3. Name it `product-images`
4. Copy the Bucket ID to your `.env` file

#### Configure Bucket Permissions:
- **Read**: `any` (allow anyone to view images)
- **Create**: `users` (only authenticated users can upload)
- **Update**: `users` (only authenticated users can update)
- **Delete**: `users` (only authenticated users can delete)

#### Configure File Settings:
- **Maximum File Size**: 5MB (or your preference)
- **Allowed File Extensions**: `jpg`, `jpeg`, `png`, `webp`
- **Compression**: Enable (optional, for better performance)

### 6. Configure Admin Access

#### Method 1: Email-based Admin Check
Update the `isAdmin` function in `src/services/appwrite.js`:

```javascript
// Check if user is admin (you can customize this logic)
isAdmin(user) {
  const adminEmails = [
    'admin@terrabotanica.com',
    'your-email@example.com'  // Add your email here
  ];
  return user && adminEmails.includes(user.email);
}
```

#### Method 2: User Labels (Recommended)
1. In Appwrite console, go to **Auth** → **Users**
2. Find your user account
3. Add a label `admin` to your user
4. Update the `isAdmin` function:

```javascript
isAdmin(user) {
  return user && user.labels && user.labels.includes('admin');
}
```

### 7. Seed Initial Products (Optional)

You can use the Admin dashboard to add products, or create a seed script:

```javascript
// Example product data
const sampleProducts = [
  {
    name: "Gentle Cleansing Oil",
    description: "A luxurious blend of organic plant oils that gently removes makeup and impurities while nourishing your skin.",
    price: 48,
    originalPrice: 55,
    category: "Cleansers",
    stock: 25,
    ingredients: ["Jojoba Oil", "Rosehip Oil", "Chamomile Extract", "Vitamin E"],
    benefits: ["Deep cleansing", "Hydrating", "Anti-inflammatory"],
    isBestseller: true,
    isNew: false
  }
  // Add more products...
];
```

## 🔧 Development Setup

### Install Dependencies
The Appwrite SDK is already included in your `package.json`. If you need to install it manually:

```bash
npm install appwrite
```

### Start Development Server
```bash
npm run dev
```

### Test Authentication
1. Go to `/login` and create a new account
2. Verify you can log in and access protected routes
3. Check that user data appears in Appwrite console

### Test Admin Features
1. Make sure your user has admin access (see step 6)
2. Go to `/admin` to access the admin dashboard
3. Try creating, editing, and deleting products

## 📱 Features Implemented

### ✅ Authentication
- [x] User registration with email/password
- [x] User login/logout
- [x] Protected routes (Profile, Cart, Checkout)
- [x] User profile management
- [x] Admin role checking

### ✅ Product Management
- [x] Fetch products from Appwrite
- [x] Product search and filtering
- [x] Category-based filtering
- [x] Admin product CRUD operations
- [x] Image upload for products
- [x] Stock management

### ✅ E-commerce Features
- [x] Add to cart (requires authentication)
- [x] Cart persistence
- [x] Checkout with product validation
- [x] Real-time stock checking
- [x] Price validation before payment

### ✅ Admin Dashboard
- [x] Product management interface
- [x] Image upload functionality
- [x] Stock tracking
- [x] Product analytics
- [x] Admin-only access control

## 🛡️ Security Features

- **Authentication Required**: Cart, Checkout, Profile, and Admin routes require login
- **Admin Protection**: Admin routes check for admin privileges
- **Input Validation**: All forms include client and server-side validation
- **Stock Validation**: Real-time stock checking prevents overselling
- **Price Validation**: Prices are validated against current Appwrite data before payment

## 🚨 Important Notes

1. **Environment Variables**: Never commit your actual Appwrite credentials to version control
2. **Admin Access**: Set up admin access before trying to use the admin dashboard
3. **Product Images**: Make sure your storage bucket allows the file types you want to upload
4. **Stock Management**: The app includes stock checking, but you may want to implement more sophisticated inventory management
5. **Payment Integration**: The checkout process validates products against Appwrite before creating Stripe sessions

## 🔍 Troubleshooting

### Common Issues:

1. **"Project not found" error**: Check your `VITE_APPWRITE_PROJECT_ID` in `.env`
2. **"Collection not found" error**: Verify your collection IDs in `.env`
3. **Permission denied**: Check collection and bucket permissions in Appwrite console
4. **Admin access denied**: Verify your user has admin privileges (see step 6)
5. **Images not loading**: Check storage bucket permissions and file upload settings

### Debug Mode:
Add this to your `.env` for more detailed error logging:
```env
VITE_DEBUG=true
```

## 📚 Next Steps

1. **Email Verification**: Set up email verification for new users
2. **Password Reset**: Implement password reset functionality
3. **Order Management**: Create order history and tracking
4. **Inventory Alerts**: Set up low stock notifications
5. **Advanced Admin Features**: Add user management, order management, etc.
6. **Performance**: Implement caching and pagination for large product catalogs

## 🆘 Support

If you encounter issues:
1. Check the Appwrite console for error logs
2. Verify all environment variables are set correctly
3. Check browser console for client-side errors
4. Review Appwrite documentation: https://appwrite.io/docs

---

**Happy coding! 🚀**