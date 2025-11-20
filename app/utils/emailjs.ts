import emailjs from '@emailjs/browser';
import { initiateRetellCallClient } from './retellClient';

// EmailJS configuration
const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '';
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '';
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '';

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export const sendContactEmail = async (formData: ContactFormData): Promise<{ success: boolean; message: string }> => {
  try {
    // Validate required environment variables
    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      console.warn('EmailJS configuration is missing. Please check your environment variables.');
      console.log('Current values:', {
        SERVICE_ID: EMAILJS_SERVICE_ID,
        TEMPLATE_ID: EMAILJS_TEMPLATE_ID,
        PUBLIC_KEY: EMAILJS_PUBLIC_KEY ? 'Set' : 'Missing'
      });
      
      // For development/testing purposes, return success without sending email
      // But still trigger Retell call if phone number is provided
      if (process.env.NODE_ENV === 'development') {
        console.log('Development mode: Simulating successful email send');
        
        // Still trigger Retell call in development mode if phone number is provided
        if (formData.phone && formData.phone.trim()) {
          initiateRetellCallClient({
            name: formData.name,
            phone: formData.phone,
            email: formData.email,
            message: formData.message,
          }).catch((error) => {
            // Log error but don't fail the submission
            console.error('Failed to initiate Retell call:', error);
          });
        }
        
        return {
          success: true,
          message: 'Thank you for your message! We will get back to you soon. (Development mode - email not sent)'
        };
      }
      
      throw new Error('EmailJS configuration is missing. Please check your environment variables.');
    }

    // Initialize EmailJS with public key
    emailjs.init(EMAILJS_PUBLIC_KEY);

    // Prepare template parameters
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      phone: formData.phone,
      message: formData.message,
      to_email: 'info@ecomsharkss.com', // Your business email
    };

    // Send email
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams
    );

    if (response.status === 200) {
      // Initiate Retell AI call after successful email send (non-blocking)
      // Only trigger if phone number is provided
      if (formData.phone && formData.phone.trim()) {
        initiateRetellCallClient({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          message: formData.message,
        }).catch((error) => {
          // Log error but don't fail the email submission
          console.error('Failed to initiate Retell call:', error);
        });
      }

      return {
        success: true,
        message: 'Thank you for your message! We will get back to you soon.'
      };
    } else {
      throw new Error('Failed to send email');
    }
  } catch (error) {
    console.error('EmailJS Error:', error);
    return {
      success: false,
      message: 'Sorry, there was an error sending your message. Please try again later.'
    };
  }
};
