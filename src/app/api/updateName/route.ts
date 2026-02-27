import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();

        if (!body || typeof body.name !== 'string') {
            return NextResponse.json(
                { success: false, message: 'Invalid payload. Name is required.' },
                { status: 400 }
            );
        }

        // Simulate database update
        await new Promise((resolve) => setTimeout(resolve, 500));

        return NextResponse.json({
            success: true,
            message: `Name successfully updated to "${body.name}"`,
        });
    } catch (error) {
        return NextResponse.json(
            { success: false, message: 'Internal server error' },
            { status: 500 }
        );
    }
}
