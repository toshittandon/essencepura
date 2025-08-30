import { Client, Databases, ID, Query } from 'node-appwrite';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const client = new Client();
const databases = new Databases(client);

client
  .setEndpoint(process.env.VITE_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1')
  .setProject(process.env.VITE_APPWRITE_PROJECT_ID || '')
  .setKey(process.env.APPWRITE_API_KEY || '');

const DATABASE_ID = process.env.VITE_APPWRITE_DATABASE_ID || '';
const NEWSLETTER_COLLECTION_ID = process.env.VITE_APPWRITE_NEWSLETTER_COLLECTION_ID || '';

// Server-side newsletter service for testing
const testNewsletterService = {
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

async function testNewsletter() {
  try {
    console.log('Testing newsletter subscription...');
    
    const testEmail = 'test@example.com';
    const testName = 'Test User';
    
    // Test subscription
    const result = await testNewsletterService.subscribe(testEmail, testName, 'test');
    console.log('✅ Newsletter subscription successful:', result);
    
    // Test getting subscribers
    const subscribers = await testNewsletterService.getSubscribers();
    console.log('✅ Retrieved subscribers:', subscribers.length);
    
    console.log('\n🎉 Newsletter functionality is working!');
    
  } catch (error) {
    console.error('❌ Newsletter test failed:', error);
    throw error;
  }
}

// Run the test
testNewsletter()
  .then(() => {
    console.log('Test completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Test failed:', error);
    process.exit(1);
  });