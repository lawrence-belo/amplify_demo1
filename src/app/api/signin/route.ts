import { NextResponse } from 'next/server';

export async function POST() {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    return NextResponse.json({
        success: true,
        message: 'Signed in successfully',
        token: 'mock-jwt-token-amplify-demo-' + Date.now(),
    });
}
