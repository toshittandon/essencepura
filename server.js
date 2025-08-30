import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Stripe from 'stripe';
import nodemailer from 'nodemailer';

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Create email transporter
const createEmailTransporter = () => {
  // For development/testing, create a test account if no email config is provided
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.log('⚠️  No email configuration found. Using test mode.');
    return null; // Will be handled in the email sending function
  }

  // Check if it's a Gmail address
  const isGmail = process.env.EMAIL_USER.includes('@gmail.com');
  
  if (isGmail) {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  } else {
    // For custom domain emails, try different SMTP configurations
    // First try with the domain's SMTP server
    const domain = process.env.EMAIL_USER.split('@')[1];
    
    return nodemailer.createTransport({
      host: `mail.${domain}`, // Try domain's mail server first
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false
      }
    });
  }
};

// Middleware
app.use(cors());
app.use(express.json());

// Create checkout session endpoint
app.post('/create-checkout-session', async (req, res) => {
  try {
    const { items, total } = req.body;

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total, // amount in cents
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        // Store order information in metadata
        items: JSON.stringify(items),
      },
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).send({
      error: 'Failed to create payment intent',
    });
  }
});

// Stripe webhook endpoint for handling events
app.post('/webhook', express.raw({ type: 'application/json' }), (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.log(`Webhook signature verification failed.`, err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      console.log('PaymentIntent was successful!', paymentIntent.id);
      
      // Here you would typically:
      // 1. Update your database with the successful payment
      // 2. Send confirmation email to customer
      // 3. Update inventory
      // 4. Create shipping label
      
      break;
    case 'payment_method.attached':
      const paymentMethod = event.data.object;
      console.log('PaymentMethod was attached to a Customer!', paymentMethod.id);
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  res.send();
});

// Contact form endpoint
app.post('/send-contact-email', async (req, res) => {
  try {
    const { firstName, lastName, email, subject, message } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email || !subject || !message) {
      return res.status(400).json({
        error: 'All fields are required'
      });
    }

    // Create email transporter
    const transporter = createEmailTransporter();

    // If no email configuration, simulate success for development
    if (!transporter) {
      console.log('📧 SIMULATED EMAIL (No email config):');
      console.log(`From: ${firstName} ${lastName} <${email}>`);
      console.log(`Subject: ${subject}`);
      console.log(`Message: ${message}`);
      
      return res.json({
        success: true,
        message: 'Email sent successfully (simulated)',
        note: 'Email configuration not found - this is a simulated response for development'
      });
    }

    // Email content to send to your business email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'info@essencepura.com', // Your business email
      subject: `Contact Form: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #8B9A8B;">New Contact Form Submission</h2>
          
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Contact Details</h3>
            <p><strong>Name:</strong> ${firstName} ${lastName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
          </div>
          
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Message</h3>
            <p style="line-height: 1.6;">${message.replace(/\n/g, '<br>')}</p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
            <p style="color: #666; font-size: 14px;">
              This email was sent from the Essence Pura contact form.
              <br>
              Reply directly to this email to respond to ${firstName}.
            </p>
          </div>
        </div>
      `,
      replyTo: email // Allow direct reply to the customer
    };

    try {
      // Send email
      await transporter.sendMail(mailOptions);

      // Send confirmation email to customer
      const confirmationMailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Thank you for contacting Essence Pura',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #8B9A8B; font-family: serif;">Essence Pura</h1>
            </div>
            
            <h2 style="color: #333;">Thank you for reaching out!</h2>
            
            <p>Dear ${firstName},</p>
            
            <p>We've received your message and appreciate you taking the time to contact us. Our team will review your inquiry and get back to you within 24 hours.</p>
            
            <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #333; margin-top: 0;">Your Message Summary</h3>
              <p><strong>Subject:</strong> ${subject}</p>
              <p><strong>Message:</strong></p>
              <p style="line-height: 1.6;">${message.replace(/\n/g, '<br>')}</p>
            </div>
            
            <p>In the meantime, feel free to explore our organic skincare collection and follow us on social media for beauty tips and updates.</p>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; text-align: center;">
              <p style="color: #8B9A8B; font-weight: bold;">Crafting organic self-care essentials that honor both your skin and the environment.</p>
              <p style="color: #666; font-size: 14px;">
                Walther Rathenau Straße, 30<br>
                Magdeburg, Germany 39106<br>
                +49 (176) 31099639
              </p>
            </div>
          </div>
        `
      };

      await transporter.sendMail(confirmationMailOptions);

      res.json({
        success: true,
        message: 'Email sent successfully'
      });

    } catch (emailError) {
      // If email sending fails, log the contact info and return success
      // This ensures the contact form doesn't break while email is being configured
      console.log('📧 EMAIL SENDING FAILED - LOGGING CONTACT INFO:');
      console.log(`From: ${firstName} ${lastName} <${email}>`);
      console.log(`Subject: ${subject}`);
      console.log(`Message: ${message}`);
      console.log(`Error: ${emailError.message}`);
      
      res.json({
        success: true,
        message: 'Message received successfully',
        note: 'Email delivery is currently being configured. Your message has been logged and we will respond soon.'
      });
    }

  } catch (error) {
    console.error('Error processing contact form:', error);
    res.status(500).json({
      error: 'Failed to process contact form',
      details: error.message
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.send({ status: 'OK', message: 'Server is running' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`Health check: http://localhost:${port}/health`);
});