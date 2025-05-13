// app/api/clerk-webhook/route.ts
import { Webhook } from 'svix'
import { headers } from 'next/headers'
import type { WebhookEvent } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/connectToDB'
import Registration from '@/models/registration'

// Type for user.created event data
type UserCreatedEvent = {
  id: string;
  email_addresses: {
    email_address: string;
  }[];
  first_name: string | null;
  last_name: string | null;
  // Add other user properties you need
};

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET

  if (!WEBHOOK_SECRET) {
    throw new Error('CLERK_WEBHOOK_SECRET is not set')
  }

  const headerPayload = headers()
  const svix_id = headerPayload.get("svix-id")
  const svix_timestamp = headerPayload.get("svix-timestamp")
  const svix_signature = headerPayload.get("svix-signature")

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occurred -- no svix headers', {
      status: 400
    })
  }

  const payload = await req.json()
  const wh = new Webhook(WEBHOOK_SECRET)
  let evt: WebhookEvent

  try {
    evt = wh.verify(JSON.stringify(payload), {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Error verifying webhook:', err)
    return new Response('Error occurred', {
      status: 400
    })
  }

  try {
    await connectDB()
    
    // Handle user creation event
    if (evt.type === 'user.created') {
      const userData = evt.data as UserCreatedEvent;
      const email = userData.email_addresses[0]?.email_address;
      const firstName = userData.first_name || '';
      const lastName = userData.last_name || '';
      
      if (!email) {
        throw new Error('No email address found in webhook payload');
      }

      await Registration.create({
        clerkUserId: userData.id,
        email,
        firstName,
        lastName,
        type: 'sponsor', // Default value
        mode: 'online',  // Default value
        role: 'user',    // Default role
        // Add other required fields with default values
        jobTitle: '',
        company: '',
        phoneNumber: '',
        country: '',
        state: '',
        industry: '',
        companySize: '',
        boothNumber: '',
        sponsorshipLevel: '',
        additionalInfo: {}
      });
    }
    
    // Handle user deletion event
    if (evt.type === 'user.deleted') {
      const deletedData = evt.data as { id: string };
      await Registration.deleteOne({ clerkUserId: deletedData.id });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Webhook processing error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}