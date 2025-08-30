# Appwrite Orders Collection Setup Guide

This guide will help you create the orders collection using the automated setup script.

## Prerequisites

1. **Appwrite Project**: You need an existing Appwrite project
2. **API Key**: You need an API key with Database permissions
3. **Environment Variables**: Your `.env` file should be configured

## Step 1: Get Your Appwrite API Key

1. Go to your [Appwrite Console](https://cloud.appwrite.io)
2. Navigate to your project
3. Go to **Settings** → **API Keys**
4. Click **Create API Key**
5. Set the following scopes:
   - `databases.read`
   - `databases.write`
   - `collections.read`
   - `collections.write`
   - `attributes.read`
   - `attributes.write`
   - `indexes.read`
   - `indexes.write`
6. Copy the generated API key

## Step 2: Configure Environment Variables

Add these to your `.env` file:

```env
# Appwrite Configuration
VITE_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT_ID=your-project-id
VITE_APPWRITE_DATABASE_ID=your-database-id
VITE_APPWRITE_ORDERS_COLLECTION_ID=orders

# API Key for setup (keep secure!)
APPWRITE_API_KEY=your-api-key-from-step-1
```

## Step 3: Run the Setup Script

```bash
npm run setup:orders
```

## What the Script Does

The setup script will:

1. **Create the orders collection** with ID `orders`
2. **Add all required attributes**:
   - `userId` (String, 255, Required)
   - `items` (String, 10000, Required) 
   - `subtotal` (Double, Required)
   - `tax` (Double, Required)
   - `total` (Double, Required)
   - `shippingAddress` (String, 2000, Required)
   - `paymentIntentId` (String, 255, Required)
   - `status` (String, 50, Required, Default: "pending")
   - `customPackagingName` (String, 30, **Optional**) ← **New Feature**
   - `createdAt` (String, 255, Required)
   - `updatedAt` (String, 255, Required)

3. **Set up permissions**:
   - Users can create and read orders
   - Only admins can update/delete orders
   - Document-level security enabled

4. **Create performance indexes**:
   - `userId_createdAt` - For user order queries
   - `status` - For filtering by order status
   - `paymentIntentId` - Unique index for payment tracking

## Expected Output

```
🚀 Creating orders collection...
✅ Collection created: orders
📝 Creating attributes...
  ✅ Created attribute: userId
  ✅ Created attribute: items
  ✅ Created attribute: subtotal
  ✅ Created attribute: tax
  ✅ Created attribute: total
  ✅ Created attribute: shippingAddress
  ✅ Created attribute: paymentIntentId
  ✅ Created attribute: status
  ✅ Created attribute: customPackagingName
  ✅ Created attribute: createdAt
  ✅ Created attribute: updatedAt
🔐 Setting up permissions...
  ✅ Permissions set successfully
🎯 Creating indexes for better performance...
  ✅ Created index: userId_createdAt
  ✅ Created index: status
  ✅ Created index: paymentIntentId

🎉 Orders collection setup complete!

📋 Summary:
   Collection ID: orders
   Database ID: your-database-id
   Attributes: 11 total (including customPackagingName)
   Indexes: 3 for optimal performance
   Permissions: Users can create/read, Admins can update/delete
```

## Troubleshooting

### Collection Already Exists
If you see "Collection already exists", the script will try to add the missing `customPackagingName` attribute to your existing collection.

### Permission Errors
- Make sure your API key has the required scopes
- Verify your project ID is correct
- Check that your database ID exists

### Rate Limits
The script includes delays between operations to avoid Appwrite rate limits. If you still hit limits, wait a few minutes and try again.

## Verification

After running the script, verify in your Appwrite Console:

1. Go to **Databases** → **Your Database** → **orders**
2. Check that all 11 attributes are present
3. Verify the `customPackagingName` attribute is optional
4. Check that indexes are created under the **Indexes** tab

## Security Note

⚠️ **Important**: Remove the `APPWRITE_API_KEY` from your `.env` file after setup is complete. This key is only needed for the initial setup.

## Manual Alternative

If you prefer to set up manually, follow the detailed instructions in `APPWRITE_SETUP.md`.