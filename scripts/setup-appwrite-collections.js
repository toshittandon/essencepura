import { Client, Databases, Storage, ID, Permission, Role } from 'node-appwrite';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const client = new Client();
const databases = new Databases(client);
const storage = new Storage(client);

client
  .setEndpoint(process.env.VITE_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1')
  .setProject(process.env.VITE_APPWRITE_PROJECT_ID)
  .setKey(process.env.APPWRITE_API_KEY);

async function setupCollections() {
  try {
    console.log('🚀 Setting up Appwrite collections...');

    // Create Products Collection
    console.log('📦 Creating Products collection...');
    const productsCollection = await databases.createCollection(
      process.env.VITE_APPWRITE_DATABASE_ID,
      process.env.VITE_APPWRITE_PRODUCTS_COLLECTION_ID || ID.unique(),
      'Products',
      [
        Permission.read(Role.any()),
        Permission.create(Role.users()),
        Permission.update(Role.users()),
        Permission.delete(Role.users())
      ]
    );

    console.log('✅ Products collection created:', productsCollection.$id);

    // Create attributes for Products collection
    const productAttributes = [
      { key: 'name', type: 'string', size: 255, required: true },
      { key: 'price', type: 'double', required: true },
      { key: 'originalPrice', type: 'double', required: false },
      { key: 'description', type: 'string', size: 1000, required: true },
      { key: 'category', type: 'string', size: 100, required: true },
      { key: 'stock', type: 'integer', required: false, default: 0 },
      { key: 'image', type: 'url', required: false },
      { key: 'imageFileId', type: 'string', size: 255, required: false },
      { key: 'ingredients', type: 'string', size: 1000, required: false, array: true },
      { key: 'benefits', type: 'string', size: 500, required: false, array: true },
      { key: 'isBestseller', type: 'boolean', required: false, default: false },
      { key: 'isNew', type: 'boolean', required: false, default: false }
    ];

    console.log('📝 Creating product attributes...');
    for (const attr of productAttributes) {
      try {
        if (attr.type === 'string') {
          await databases.createStringAttribute(
            process.env.VITE_APPWRITE_DATABASE_ID,
            productsCollection.$id,
            attr.key,
            attr.size,
            attr.required,
            attr.default,
            attr.array || false
          );
        } else if (attr.type === 'double') {
          await databases.createFloatAttribute(
            process.env.VITE_APPWRITE_DATABASE_ID,
            productsCollection.$id,
            attr.key,
            attr.required,
            attr.min,
            attr.max,
            attr.default
          );
        } else if (attr.type === 'integer') {
          await databases.createIntegerAttribute(
            process.env.VITE_APPWRITE_DATABASE_ID,
            productsCollection.$id,
            attr.key,
            attr.required,
            attr.min,
            attr.max,
            attr.default
          );
        } else if (attr.type === 'boolean') {
          await databases.createBooleanAttribute(
            process.env.VITE_APPWRITE_DATABASE_ID,
            productsCollection.$id,
            attr.key,
            attr.required,
            attr.default
          );
        } else if (attr.type === 'url') {
          await databases.createUrlAttribute(
            process.env.VITE_APPWRITE_DATABASE_ID,
            productsCollection.$id,
            attr.key,
            attr.required,
            attr.default
          );
        }
        console.log(`  ✅ Created ${attr.key} attribute`);
        
        // Wait a bit between attribute creation
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (error) {
        if (error.code === 409) {
          console.log(`  ⚠️  Attribute ${attr.key} already exists`);
        } else {
          console.error(`  ❌ Error creating ${attr.key}:`, error.message);
        }
      }
    }

    // Create Storage Bucket for product images
    console.log('🖼️  Creating storage bucket for product images...');
    try {
      const bucket = await storage.createBucket(
        process.env.VITE_APPWRITE_STORAGE_BUCKET_ID || ID.unique(),
        'Product Images',
        [
          Permission.read(Role.any()),
          Permission.create(Role.users()),
          Permission.update(Role.users()),
          Permission.delete(Role.users())
        ],
        false, // fileSecurity
        true,  // enabled
        undefined, // maximumFileSize (default)
        ['jpg', 'jpeg', 'png', 'gif', 'webp'], // allowedFileExtensions
        'none', // compression
        false, // encryption
        false  // antivirus
      );
      console.log('✅ Storage bucket created:', bucket.$id);
    } catch (error) {
      if (error.code === 409) {
        console.log('⚠️  Storage bucket already exists');
      } else {
        console.error('❌ Error creating storage bucket:', error.message);
      }
    }

    console.log('\n🎉 Setup complete!');
    console.log('\n📋 Next steps:');
    console.log('1. Go to your Appwrite Console');
    console.log('2. Navigate to Databases > Products collection');
    console.log('3. Add your products manually with images');
    console.log('4. Your React app will automatically fetch and display them');
    console.log('\n🔗 Appwrite Console: https://cloud.appwrite.io/');

  } catch (error) {
    console.error('❌ Setup failed:', error);
  }
}

setupCollections();