import { NextRequest, NextResponse } from 'next/server';
import GuerrillaMailAPI from '@/lib/guerrillamail';
import { APIResponse } from '@/types/email';

export async function GET(request: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get('action');
  const seq = searchParams.get('seq') || '0';
  const offset = searchParams.get('offset') || '0';
  const emailId = searchParams.get('email_id');
  const domain = searchParams.get('domain');
  const lang = searchParams.get('lang') || 'en';

  try {
    let result: any;

    // Set domain if provided
    if (domain) {
      GuerrillaMailAPI.setSite(domain);
    }

    switch (action) {
      case 'get_address':
        // Get existing email or create new if doesn't exist
        result = await GuerrillaMailAPI.getEmailAddress(lang, domain || undefined);
        break;
        
      case 'get_new_address':
        // Force create new email address with random username
        const randomUser = Math.random().toString(36).substring(2, 10);
        result = await GuerrillaMailAPI.setEmailUser(randomUser, lang, domain || undefined);
        break;
        
      case 'check_email':
        result = await GuerrillaMailAPI.checkEmail(parseInt(seq));
        break;
        
      case 'get_list':
        result = await GuerrillaMailAPI.getEmailList(parseInt(offset));
        break;
        
      case 'fetch_email':
        if (!emailId) {
          return NextResponse.json<APIResponse>({ 
            success: false,
            error: 'Email ID is required' 
          }, { status: 400 });
        }
        result = await GuerrillaMailAPI.fetchEmail(emailId);
        break;
        
      default:
        return NextResponse.json<APIResponse>({ 
          success: false,
          error: 'Invalid action' 
        }, { status: 400 });
    }

    return NextResponse.json<APIResponse>({ 
      success: true, 
      data: result 
    });
  } catch (error) {
    console.error('API Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json<APIResponse>({ 
      success: false,
      error: errorMessage 
    }, { status: 500 });
  }
}

interface PostRequestBody {
  action: string;
  email_user?: string;
  email_ids?: string[];
  email_addr?: string;
  domain?: string;
  lang?: string;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body: PostRequestBody = await request.json();
    const { action, email_user, email_ids, email_addr, domain, lang = 'en' } = body;

    let result: any;

    // Set domain if provided
    if (domain) {
      GuerrillaMailAPI.setSite(domain);
    }

    switch (action) {
      case 'set_user':
        if (!email_user) {
          return NextResponse.json<APIResponse>({ 
            success: false,
            error: 'Email user is required' 
          }, { status: 400 });
        }
        result = await GuerrillaMailAPI.setEmailUser(email_user, lang, domain || undefined);
        break;
        
      case 'delete_emails':
        if (!email_ids || email_ids.length === 0) {
          return NextResponse.json<APIResponse>({ 
            success: false,
            error: 'Email IDs are required' 
          }, { status: 400 });
        }
        result = await GuerrillaMailAPI.deleteEmails(email_ids);
        break;
        
      case 'forget_me':
        if (!email_addr) {
          return NextResponse.json<APIResponse>({ 
            success: false,
            error: 'Email address is required' 
          }, { status: 400 });
        }
        result = await GuerrillaMailAPI.forgetMe(email_addr);
        break;
        
      case 'create_new':
        // Create completely new email with random username
        const randomUser = Math.random().toString(36).substring(2, 10);
        result = await GuerrillaMailAPI.setEmailUser(randomUser, lang, domain || undefined);
        break;
        
      default:
        return NextResponse.json<APIResponse>({ 
          success: false,
          error: 'Invalid action' 
        }, { status: 400 });
    }

    return NextResponse.json<APIResponse>({ 
      success: true, 
      data: result 
    });
  } catch (error) {
    console.error('API Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json<APIResponse>({ 
      success: false,
      error: errorMessage 
    }, { status: 500 });
  }
}

// Optional: Add OPTIONS method for CORS if needed
export async function OPTIONS(request: NextRequest): Promise<NextResponse> {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}