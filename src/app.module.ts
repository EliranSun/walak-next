import { Module } from '@nestjs/common';
import { MessagingService } from './services/messaging.service';

@Module({
    imports: [
        // ... existing imports
    ],
    controllers: [
        // ... existing controllers
    ],
    providers: [
        // ... existing providers
        MessagingService,
    ],
})
export class AppModule { } 