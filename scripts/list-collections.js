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

async function listCollections() {
  try {
    console.log('Listing all collections in database:', DATABASE_ID);
    
    const collections = await databases.listCollections(DATABASE_ID);
    
    console.log('\n📋 Collections found:');
    collections.collections.forEach((collection, index) => {
      console.log(`${index + 1}. Name: ${collection.name}`);
      console.log(`   ID: ${collection.$id}`);
      console.log(`   Created: ${collection.$createdAt}`);
      console.log('');
    });
    
    console.log(`Total collections: ${collections.collections.length}`);
    
  } catch (error) {
    console.error('❌ Error listing collections:', error);
    throw error;
  }
}

// Run the listing
listCollections()
  .then(() => {
    console.log('Listing completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Listing failed:', error);
    process.exit(1);
  });