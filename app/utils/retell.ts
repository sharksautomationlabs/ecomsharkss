// Import Retell SDK
// @ts-ignore - retell-sdk may not have TypeScript definitions
import Retell from 'retell-sdk';

// Retell AI configuration
const RETELL_API_KEY = 'key_8366efc2e459f510d89805069a5d';
const RETELL_AGENT_ID = 'agent_80c922ad9ead6d1554f8362c5d';
const RETELL_FROM_NUMBER = '+14692109993';

// Initialize Retell client
const getRetellClient = () => {
  if (!RETELL_API_KEY) {
    throw new Error('RETELL_API_KEY is not configured');
  }
  
  return new Retell({
    apiKey: RETELL_API_KEY,
  });
};

export interface RetellCallData {
  name: string;
  phone: string;
  email?: string;
  message?: string;
}

export interface RetellCallResponse {
  success: boolean;
  callId?: string;
  message: string;
}

/**
 * Initiates a phone call using Retell AI agent
 * @param callData - The lead information including phone number
 * @returns Promise with call initiation result
 */
export const initiateRetellCall = async (
  callData: RetellCallData
): Promise<RetellCallResponse> => {
  try {
    // Validate configuration
    if (!RETELL_API_KEY || !RETELL_AGENT_ID || !RETELL_FROM_NUMBER) {
      throw new Error('Retell AI configuration is missing');
    }

    // Validate phone number
    if (!callData.phone || !callData.phone.trim()) {
      throw new Error('Phone number is required');
    }

    // Format phone number for international calling (supports all countries)
    let formattedPhone = callData.phone.trim();
    
    // Remove spaces, dashes, parentheses, and other formatting characters
    formattedPhone = formattedPhone.replace(/[\s\-\(\)\.]/g, '');
    
    // Handle different phone number formats
    if (formattedPhone.startsWith('+')) {
      // Already in international format with +, use as-is
      formattedPhone = formattedPhone;
    } else if (formattedPhone.startsWith('00')) {
      // International format starting with 00, convert to +
      formattedPhone = '+' + formattedPhone.substring(2);
    } else {
      // No country code prefix - add + prefix to support international numbers
      // Extract only digits
      const digitsOnly = formattedPhone.replace(/\D/g, '');
      
      // Validate minimum length
      if (digitsOnly.length < 7) {
        throw new Error('Invalid phone number format. Phone number is too short.');
      }
      
      // Add + prefix - this allows Retell to handle numbers from any country
      // Examples: 
      // - "1234567890" becomes "+1234567890" (could be US, Canada, etc.)
      // - "441234567890" becomes "+441234567890" (UK)
      // - "911234567890" becomes "+911234567890" (India)
      formattedPhone = `+${digitsOnly}`;
    }
    
    // Final validation: ensure it starts with + and has sufficient digits
    const finalDigits = formattedPhone.replace(/\D/g, '');
    if (!formattedPhone.startsWith('+') || finalDigits.length < 7) {
      throw new Error('Invalid phone number format. Please use international format (e.g., +1234567890, +441234567890)');
    }

    // Initialize Retell client
    const retellClient = getRetellClient();

    // Prepare call parameters with dynamic variables
    const callParams: any = {
      from_number: RETELL_FROM_NUMBER,
      to_number: formattedPhone,
      override_agent_id: RETELL_AGENT_ID,
    };

    // Add dynamic variables for personalization in Retell AI agent
    // These variables can be used in agent prompts as {{user_name}}, {{user_email}}, {{user_phone}}
    const dynamicVariables: Record<string, string> = {};
    
    if (callData.name) {
      dynamicVariables.user_name = callData.name;
    }
    
    if (callData.email) {
      dynamicVariables.user_email = callData.email;
    }
    
    if (callData.phone) {
      dynamicVariables.user_phone = formattedPhone; // Use formatted phone number
    }
    
    if (callData.message) {
      dynamicVariables.user_message = callData.message;
    }
    
    // Add dynamic variables to call parameters (Retell AI uses retell_llm_dynamic_variables)
    if (Object.keys(dynamicVariables).length > 0) {
      callParams.retell_llm_dynamic_variables = dynamicVariables;
    }

    // Initiate the call
    const response = await retellClient.call.createPhoneCall(callParams);

    if (response && response.call_id) {
      console.log('Retell call initiated successfully:', response.call_id);
      return {
        success: true,
        callId: response.call_id,
        message: 'Call initiated successfully'
      };
    } else {
      throw new Error('Failed to initiate call - no call ID returned');
    }
  } catch (error: any) {
    console.error('Retell AI Error:', error);
    
    // Return user-friendly error message
    const errorMessage = error?.message || 'Failed to initiate call';
    return {
      success: false,
      message: errorMessage
    };
  }
};

/**
 * Validates Retell AI configuration
 * @returns boolean indicating if configuration is valid
 */
export const validateRetellConfig = (): boolean => {
  return !!(
    RETELL_API_KEY &&
    RETELL_AGENT_ID &&
    RETELL_FROM_NUMBER
  );
};

