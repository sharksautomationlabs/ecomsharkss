/**
 * Client-side utility for initiating Retell AI calls
 * This makes a request to the API route which handles the server-side call initiation
 */

export interface RetellCallRequest {
  name: string;
  phone: string;
  email?: string;
  message?: string;
}

export interface RetellCallClientResponse {
  success: boolean;
  callId?: string;
  message: string;
}

/**
 * Initiates a Retell AI call by making a request to the API route
 * @param callData - The lead information including phone number
 * @returns Promise with call initiation result
 */
export const initiateRetellCallClient = async (
  callData: RetellCallRequest
): Promise<RetellCallClientResponse> => {
  try {
    // Validate required fields
    if (!callData.name || !callData.phone) {
      return {
        success: false,
        message: 'Name and phone number are required'
      };
    }

    // Make API request to initiate call
    const response = await fetch('/api/retell/call', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: callData.name,
        phone: callData.phone,
        email: callData.email || '',
        message: callData.message || '',
      }),
    });

    const result = await response.json();

    if (response.ok && result.success) {
      return {
        success: true,
        callId: result.callId,
        message: result.message || 'Call initiated successfully'
      };
    } else {
      return {
        success: false,
        message: result.message || 'Failed to initiate call'
      };
    }
  } catch (error: any) {
    console.error('Retell Client Error:', error);
    return {
      success: false,
      message: error?.message || 'An unexpected error occurred while initiating the call'
    };
  }
};

