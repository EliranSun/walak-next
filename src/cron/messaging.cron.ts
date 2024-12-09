import cron from 'node-cron';
import { MessagingService } from '../services/messaging.service';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const messagingService = new MessagingService();

// Schedule task to run at 10:00 AM every day
cron.schedule('0 10 * * *', async () => {
    try {
        console.log(`[${new Date().toISOString()}] Running daily message task...`);
        const success = await messagingService.sendMessage('Daily scheduled message!');

        if (success) {
            console.log(`[${new Date().toISOString()}] Message sent successfully`);
        } else {
            console.error(`[${new Date().toISOString()}] Failed to send message`);
        }
    } catch (error) {
        console.error(`[${new Date().toISOString()}] Error in cron job:`, error);
    }
}, {
    scheduled: true,
    timezone: "Asia/Jerusalem" // Adjust timezone as needed
});

console.log(`[${new Date().toISOString()}] Cron job scheduled`); 