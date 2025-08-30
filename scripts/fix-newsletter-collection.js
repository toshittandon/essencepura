import { Client, Databases } from 'node-appwrite';
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
const COLLECTION_ID = process.env.VITE_APPWRITE_NEWSLETTER_COLLECTION_ID || '';

async function fixNewsletterCollection() {
  try {
    console.log('Adding missing isActive attribute...');
    
    // Add the isActive attribute without default value
    await databases.createBooleanAttribute(
      DATABASE_ID,
      COLLECTION_ID,
      'isActive',
      false, // not required
      null,  // no default
      false  // not array
    );
    
    console.log('✅ Added isActive attribute');
    
    // Recreate the index with isActive
    try {
      await databases.createIndex(
        DATABASE_ID,
        COLLECTION_ID,
        'active_subscribers_index',
        'key',
        ['isActive', 'subscribedAt'],
        ['asc', 'desc']
      );
      console.log('✅ Created active subscribers index');
    } catch (error) {
      console.log('Index might already exist:', error.message);
    }
    
    console.log('\n🎉 Newsletter collection fixed successfully!');
    
  } catch (error) {
    console.error('❌ Error fixing newsletter collection:', error);
    throw error;
  }
}

// Run the fix
fixNewsletterCollection()
  .then(() => {
    console.log('Fix completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Fix failed:', error);
    process.exit(1);
  });