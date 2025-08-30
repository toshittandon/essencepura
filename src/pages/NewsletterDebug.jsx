import { useState, useEffect } from 'react';
import { newsletterService, databases, DATABASE_ID, NEWSLETTER_COLLECTION_ID } from '@/services/appwrite';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const NewsletterDebug = () => {
  const [email, setEmail] = useState('test@example.com');
  const [debugInfo, setDebugInfo] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const addDebugInfo = (info) => {
    setDebugInfo(prev => prev + '\n' + new Date().toLocaleTimeString() + ': ' + info);
  };

  const testConnection = async () => {
    setIsLoading(true);
    setDebugInfo('Starting connection test...');
    
    try {
      addDebugInfo('Testing Appwrite configuration...');
      addDebugInfo(`Endpoint: ${import.meta.env.VITE_APPWRITE_ENDPOINT}`);
      addDebugInfo(`Project ID: ${import.meta.env.VITE_APPWRITE_PROJECT_ID}`);
      addDebugInfo(`Database ID: ${DATABASE_ID}`);
      addDebugInfo(`Newsletter Collection ID: ${NEWSLETTER_COLLECTION_ID}`);
      
      // Test database connection
      addDebugInfo('Testing database connection...');
      const response = await databases.listDocuments(
        DATABASE_ID,
        NEWSLETTER_COLLECTION_ID,
        []
      );
      addDebugInfo(`✅ Database connection successful! Found ${response.documents.length} existing subscribers`);
      
      // List existing subscribers
      if (response.documents.length > 0) {
        addDebugInfo('Existing subscribers:');
        response.documents.forEach((doc, index) => {
          addDebugInfo(`  ${index + 1}. ${doc.email} (${doc.source || 'unknown source'})`);
        });
      }
      
    } catch (error) {
      addDebugInfo(`❌ Connection test failed: ${error.message}`);
      console.error('Connection test error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const testSubscription = async () => {
    if (!email) {
      addDebugInfo('❌ Please enter an email address');
      return;
    }

    setIsLoading(true);
    addDebugInfo(`Testing subscription for: ${email}`);
    
    try {
      const result = await newsletterService.subscribe(email, 'Test User', 'debug-page');
      addDebugInfo(`✅ Subscription successful!`);
      addDebugInfo(`Document ID: ${result.$id}`);
      addDebugInfo(`Email: ${result.email}`);
      addDebugInfo(`Source: ${result.source}`);
    } catch (error) {
      addDebugInfo(`❌ Subscription failed: ${error.message}`);
      console.error('Subscription error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const clearDebugInfo = () => {
    setDebugInfo('');
  };

  useEffect(() => {
    // Auto-test connection on component mount
    testConnection();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Newsletter Debug Tool</h1>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Test Controls</h2>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium">Test Email:</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter test email"
            />
          </div>
          
          <div className="flex space-x-2">
            <Button onClick={testConnection} disabled={isLoading}>
              Test Connection
            </Button>
            <Button onClick={testSubscription} disabled={isLoading}>
              Test Subscription
            </Button>
            <Button onClick={clearDebugInfo} variant="outline">
              Clear Log
            </Button>
          </div>
        </div>
        
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Environment Check</h2>
          <div className="text-sm space-y-1">
            <div>Endpoint: {import.meta.env.VITE_APPWRITE_ENDPOINT || '❌ Missing'}</div>
            <div>Project ID: {import.meta.env.VITE_APPWRITE_PROJECT_ID || '❌ Missing'}</div>
            <div>Database ID: {DATABASE_ID || '❌ Missing'}</div>
            <div>Newsletter Collection: {NEWSLETTER_COLLECTION_ID || '❌ Missing'}</div>
          </div>
        </div>
      </div>
      
      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-2">Debug Log</h2>
        <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-auto h-96 whitespace-pre-wrap">
          {debugInfo || 'No debug information yet...'}
        </pre>
      </div>
    </div>
  );
};

export default NewsletterDebug;