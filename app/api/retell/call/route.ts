import { NextRequest, NextResponse } from 'next/server';
import { initiateRetellCall, RetellCallData } from '../../../utils/retell';

/**
 * API route to initiate Retell AI calls
 * POST /api/retell/call
 */
export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();
    const { name, phone, email, message } = body;

    // Validate required fields
    if (!name || !phone) {
      return NextResponse.json(
        {
          success: false,
          message: 'Name and phone number are required'
        },
        { status: 400 }
      );
    }

    // Prepare call data
    const callData: RetellCallData = {
      name: name.trim(),
      phone: phone.trim(),
      email: email?.trim() || '',
      message: message?.trim() || '',
    };

    // Initiate the call
    const result = await initiateRetellCall(callData);

    if (result.success) {
      return NextResponse.json(
        {
          success: true,
          callId: result.callId,
          message: result.message
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          success: false,
          message: result.message || 'Failed to initiate call'
        },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error('API Error initiating Retell call:', error);
    return NextResponse.json(
      {
        success: false,
        message: error?.message || 'An unexpected error occurred'
      },
      { status: 500 }
    );
  }
}

