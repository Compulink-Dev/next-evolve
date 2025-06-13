import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  try {
    cookies().set({
      name: 'otp-verified',
      value: 'true',
      path: '/',
      maxAge: 24 * 60 * 60, // 24 hours
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      httpOnly: true,
    });

    return NextResponse.json(
      { success: true },
      {
        headers: {
          'Set-Cookie': `otp-verified=true; Path=/; Max-Age=${24 * 60 * 60}; ${
            process.env.NODE_ENV === 'production' ? 'Secure; ' : ''
          }HttpOnly; SameSite=Strict`,
        },
      }
    );
  } catch (error) {
    console.error('Error setting cookie:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to set cookie' },
      { status: 500 }
    );
  }
}