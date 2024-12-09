import { Twilio } from 'twilio';

export class MessagingService {
    private client: Twilio;
    private readonly fromNumber: string;
    private readonly toNumber: string = '+972503443947';

    constructor() {
        if (!process.env.TWILIO_ACCOUNT_SID) throw new Error('TWILIO_ACCOUNT_SID is required');
        if (!process.env.TWILIO_AUTH_TOKEN) throw new Error('TWILIO_AUTH_TOKEN is required');
        if (!process.env.TWILIO_PHONE_NUMBER) throw new Error('TWILIO_PHONE_NUMBER is required');

        this.client = new Twilio(
            process.env.TWILIO_ACCOUNT_SID,
            process.env.TWILIO_AUTH_TOKEN
        );
        this.fromNumber = process.env.TWILIO_PHONE_NUMBER;
    }

    async sendMessage(message: string = 'This is a test message'): Promise<boolean> {
        try {
            const response = await this.client.messages.create({
                body: message,
                from: this.fromNumber,
                to: this.toNumber,
            });

            console.log('Message sent successfully:', response.sid);
            return true;
        } catch (error) {
            console.error('Error sending message:', error);
            return false;
        }
    }
} 