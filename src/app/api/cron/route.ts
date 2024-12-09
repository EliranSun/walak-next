import { MessagingService } from '@/services/messaging.service';
import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET(request: Request) {
    try {
        const messagingService = new MessagingService();
        await messagingService.sendMessage('Daily scheduled message!');
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Cron job failed:', error);
        return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
    }
}

// Configure the cron schedule in vercel.json
export const config = {
    maxDuration: 10 // seconds
}; 