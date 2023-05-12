import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  port: process.env.APP_PORT || 4000,
  jwtSecret: process.env.JWT_ENCRYPTION_KEY,
  jwtExpiry: process.env.JWT_EXPIRATION_TIME,
  paystack_secret_key: process.env.PAYSTACK_SECRET_KEY,
}));
