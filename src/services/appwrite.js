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

  // Get current user
  async getCurrentUser() {
    try {
      return await account.get();
    } catch (error) {
      console.error('Error getting current user:', error);
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

export default client;