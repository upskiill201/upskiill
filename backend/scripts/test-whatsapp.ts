import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { WhatsappService } from '../src/whatsapp/whatsapp.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const whatsappService = app.get(WhatsappService);

  const testPhone = process.argv[2] || '2348123456789';
  console.log(`\n--- TESTING META WHATSAPP CLOUD API ---`);
  console.log(`Sending OTP to phone number: ${testPhone}`);

  try {
    const res = await whatsappService.sendOtp(testPhone);
    console.log(`Result:`, JSON.stringify(res, null, 2));
  } catch (err) {
    console.error(`Error sending WhatsApp OTP:`, err);
  } finally {
    await app.close();
  }
}

bootstrap();
