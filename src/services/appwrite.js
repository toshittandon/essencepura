import { Client, Account, Databases, Storage, ID, Query } from 'appwrite';

// Appwrite configuration
// Add these to your .env file:
// VITE_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
// VITE_APPWRITE_PROJECT_ID=your-project-id
// VITE_APPWRITE_DATABASE_ID=your-database-id
// VITE_APPWRITE_PRODUCTS_COLLECTION_ID=your-products-collection-id
// VITE_APPWRITE_STORAGE_BUCKET_ID=your-storage-bucket-id

const client = new Client();

client
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1')
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID || '');

// Initialize services
export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

// Database and collection IDs
export const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID || '';
export const PRODUCTS_COLLECTION_ID = import.meta.env.VITE_APPWRITE_PRODUCTS_COLLECTION_ID || '';
export const NEWSLETTER_COLLECTION_ID = import.meta.env.VITE_APPWRITE_NEWSLETTER_COLLECTION_ID || '';
export const STORAGE_BUCKET_ID = import.meta.env.VITE_APPWRITE_STORAGE_BUCKET_ID || '';

// Authentication functions
export const authService = {
  // Create new account
  async createAccount(email, password, name) {
    try {
      const userAccount = await account.create(ID.unique(), email, password, name);
      if (userAccount) {
        // Automatically log in after account creation
        return await this.login(email, password);
      }
      return userAccount;
    } catch (error) {
      console.error('Error creating account:', error);
      throw error;
    }
  },

  // Login user
  async login(email, password) {
    try {
      const session = await account.createEmailPasswordSession(email, password);
      return session;
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  },

  // OAuth login with Google
  async loginWithGoogle() {
    try {
      // Redirect to Google OAuth
      account.createOAuth2Session(
        'google',
        `${window.location.origin}/auth/success`, // Success redirect
        `${window.location.origin}/auth/failure`  // Failure redirect
      );
    } catch (error) {
      console.error('Error with Google OAuth:', error);
      throw error;
    }
  },

  // OAuth login with Apple
  async loginWithApple() {
    try {
      // Redirect to Apple OAuth
      account.createOAuth2Session(
        'apple',
        `${window.location.origin}/auth/success`, // Success redirect
        `${window.location.origin}/auth/failure`  // Failure redirect
      );
    } catch (error) {
      console.error('Error with Apple OAuth:', error);
      throw error;
    }
  },

  // Get current user
  async getCurrentUser() {
    try {
      return await account.get();
    } catch (error) {
      // Don't log 401 errors - they're expected when no user is logged in
      if (error.code !== 401) {
        console.error('Error getting current user:', error);
      }
      return null;
    }
  },

  // Logout user
  async logout() {
    try {
      await account.deleteSession('current');
    } catch (error) {
      console.error('Error logging out:', error);
      throw error;
    }
  },

  // Update user profile
  async updateProfile(name) {
    try {
      return await account.updateName(name);
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  },

  // Update user email
  async updateEmail(email, password) {
    try {
      return await account.updateEmail(email, password);
    } catch (error) {
      console.error('Error updating email:', error);
      throw error;
    }
  },

  // Update user password
  async updatePassword(newPassword, oldPassword) {
    try {
      return await account.updatePassword(newPassword, oldPassword);
    } catch (error) {
      console.error('Error updating password:', error);
      throw error;
    }
  }
};

// Product management functions
export const productService = {
  // Get all products
  async getProducts() {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        PRODUCTS_COLLECTION_ID,
        [Query.orderDesc('$createdAt')]
      );
      return response.documents;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  // Get product by ID
  async getProduct(productId) {
    try {
      return await databases.getDocument(
        DATABASE_ID,
        PRODUCTS_COLLECTION_ID,
        productId
      );
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  },

  // Get products by category
  async getProductsByCategory(category) {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        PRODUCTS_COLLECTION_ID,
        [
          Query.equal('category', category),
          Query.orderDesc('$createdAt')
        ]
      );
      return response.documents;
    } catch (error) {
      console.error('Error fetching products by category:', error);
      throw error;
    }
  },

  // Create new product (Admin only)
  async createProduct(productData) {
    try {
      return await databases.createDocument(
        DATABASE_ID,
        PRODUCTS_COLLECTION_ID,
        ID.unique(),
        productData
      );
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  },

  // Update product (Admin only)
  async updateProduct(productId, productData) {
    try {
      return await databases.updateDocument(
        DATABASE_ID,
        PRODUCTS_COLLECTION_ID,
        productId,
        productData
      );
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  },

  // Delete product (Admin only)
  async deleteProduct(productId) {
    try {
      await databases.deleteDocument(
        DATABASE_ID,
        PRODUCTS_COLLECTION_ID,
        productId
      );
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  },

  // Upload product image
  async uploadImage(file) {
    try {
      const response = await storage.createFile(
        STORAGE_BUCKET_ID,
        ID.unique(),
        file
      );
      
      // Get file preview URL
      const imageUrl = storage.getFilePreview(
        STORAGE_BUCKET_ID,
        response.$id,
        400, // width
        400, // height
        'center', // gravity
        100 // quality
      );
      
      return {
        fileId: response.$id,
        imageUrl: imageUrl.href
      };
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  },

  // Delete image
  async deleteImage(fileId) {
    try {
      await storage.deleteFile(STORAGE_BUCKET_ID, fileId);
    } catch (error) {
      console.error('Error deleting image:', error);
      throw error;
    }
  }
};

// Utility functions
export const utils = {
  // Format price for display
  formatPrice(price) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  },

  // Check if user is admin (you can customize this logic)
  isAdmin(user) {
    // Add your admin check logic here
    // For example, check if user email is in admin list
    const adminEmails = ['admin@terrabotanica.com']; // Add your admin emails
    return user && adminEmails.includes(user.email);
  },

  // Validate product data
  validateProductData(productData) {
    const required = ['name', 'price', 'description', 'category'];
    const missing = required.filter(field => !productData[field]);
    
    if (missing.length > 0) {
      throw new Error(`Missing required fields: ${missing.join(', ')}`);
    }
    
    if (productData.price <= 0) {
      throw new Error('Price must be greater than 0');
    }
    
    if (productData.stock < 0) {
      throw new Error('Stock cannot be negative');
    }
    
    return true;
  }
};

// Newsletter management functions
export const newsletterService = {
  // Subscribe to newsletter
  async subscribe(email, name = '', source = 'website') {
    try {
      // Check if email already exists
      const existing = await databases.listDocuments(
        DATABASE_ID,
        NEWSLETTER_COLLECTION_ID,
        [Query.equal('email', email)]
      );

      if (existing.documents.length > 0) {
        // Update existing subscription
        const updateData = {
          name: name || existing.documents[0].name,
          source,
          updatedAt: new Date().toISOString()
        };
        
        return await databases.updateDocument(
          DATABASE_ID,
          NEWSLETTER_COLLECTION_ID,
          existing.documents[0].$id,
          updateData
        );
      } else {
        // Create new subscription
        const createData = {
          email,
          name,
          source,
          subscribedAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        
        return await databases.createDocument(
          DATABASE_ID,
          NEWSLETTER_COLLECTION_ID,
          ID.unique(),
          createData
        );
      }
    } catch (error) {
      console.error('Error subscribing to newsletter:', error);
      throw error;
    }
  },

  // Unsubscribe from newsletter (delete the document since we don't have isActive)
  async unsubscribe(email) {
    try {
      const existing = await databases.listDocuments(
        DATABASE_ID,
        NEWSLETTER_COLLECTION_ID,
        [Query.equal('email', email)]
      );

      if (existing.documents.length > 0) {
        // Delete the document since we don't have isActive attribute
        return await databases.deleteDocument(
          DATABASE_ID,
          NEWSLETTER_COLLECTION_ID,
          existing.documents[0].$id
        );
      }
    } catch (error) {
      console.error('Error unsubscribing from newsletter:', error);
      throw error;
    }
  },

  // Get all newsletter subscribers (Admin only)
  async getSubscribers() {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        NEWSLETTER_COLLECTION_ID,
        [Query.orderDesc('subscribedAt')]
      );
      return response.documents;
    } catch (error) {
      console.error('Error fetching newsletter subscribers:', error);
      throw error;
    }
  }
};

export default client;