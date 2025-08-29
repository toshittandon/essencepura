import { Client, Databases, ID } from 'appwrite';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const client = new Client();
const databases = new Databases(client);

client
    .setEndpoint(process.env.VITE_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1')
    .setProject(process.env.VITE_APPWRITE_PROJECT_ID || '')
    .setKey(process.env.APPWRITE_API_KEY || ''); // You'll need to add this to your .env

const DATABASE_ID = process.env.VITE_APPWRITE_DATABASE_ID || '';

async function createNewsletterCollection() {
    try {
        console.log('Creating newsletter collection...');

        // Create the newsletter collection
        const collection = await databases.createCollection(
            DATABASE_ID,
            ID.unique(),
            'newsletter_subscribers',
            [
                // Read permissions for admin users
                'read("any")',
                // Write permissions for any authenticated user (for self-subscription)
                'write("any")'
            ]
        );

        console.log('Newsletter collection created:', collection.$id);

        // Create attributes for the collection
        const attributes = [
            {
                key: 'email',
                type: 'string',
                size: 255,
                required: true,
                array: false
            },
            {
                key: 'name',
                type: 'string',
                size: 255,
                required: false,
                array: false
            },
            {
                key: 'isActive',
                type: 'boolean',
                required: true,
                array: false,
                default: true
            },
            {
                key: 'source',
                type: 'string',
                size: 50,
                required: false,
                array: false
            },
            {
                key: 'subscribedAt',
                type: 'datetime',
                required: true,
                array: false
            },
            {
                key: 'updatedAt',
                type: 'datetime',
                required: true,
                array: false
            }
        ];

        // Create each attribute
        for (const attr of attributes) {
            try {
                let attribute;

                switch (attr.type) {
                    case 'string':
                        attribute = await databases.createStringAttribute(
                            DATABASE_ID,
                            collection.$id,
                            attr.key,
                            attr.size,
                            attr.required,
                            attr.default,
                            attr.array
                        );
                        break;
                    case 'boolean':
                        attribute = await databases.createBooleanAttribute(
                            DATABASE_ID,
                            collection.$id,
                            attr.key,
                            attr.required,
                            attr.default,
                            attr.array
                        );
                        break;
                    case 'datetime':
                        attribute = await databases.createDatetimeAttribute(
                            DATABASE_ID,
                            collection.$id,
                            attr.key,
                            attr.required,
                            attr.default,
                            attr.array
                        );
                        break;
                }

                console.log(`Created attribute: ${attr.key}`);
            } catch (error) {
                console.error(`Error creating attribute ${attr.key}:`, error.message);
            }
        }

        // Create indexes for better performance
        try {
            await databases.createIndex(
                DATABASE_ID,
                collection.$id,
                'email_index',
                'key',
                ['email'],
                ['asc']
            );
            console.log('Created email index');

            await databases.createIndex(
                DATABASE_ID,
                collection.$id,
                'active_subscribers_index',
                'key',
                ['isActive', 'subscribedAt'],
                ['asc', 'desc']
            );
            console.log('Created active subscribers index');
        } catch (error) {
            console.error('Error creating indexes:', error.message);
        }

        console.log('\n✅ Newsletter collection setup complete!');
        console.log(`📝 Add this to your .env file:`);
        console.log(`VITE_APPWRITE_NEWSLETTER_COLLECTION_ID="${collection.$id}"`);

        return collection.$id;
    } catch (error) {
        console.error('❌ Error creating newsletter collection:', error);
        throw error;
    }
}

// Run the setup
createNewsletterCollection()
    .then((collectionId) => {
        console.log(`\n🎉 Newsletter collection created successfully!`);
        console.log(`Collection ID: ${collectionId}`);
        process.exit(0);
    })
    .catch((error) => {
        console.error('Setup failed:', error);
        process.exit(1);
    });