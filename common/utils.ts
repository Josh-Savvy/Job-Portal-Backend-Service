import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { HttpException, HttpStatus } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';

export const createHash = (value: string): string | any => {
  if (!value) {
    throw new HttpException(
      'Please provide a value for hashing',
      HttpStatus.BAD_REQUEST,
    );
  }
  return bcrypt.hash(value, 10);
};

export const compareHash = (
  value: string,
  hashed: string,
): Promise<boolean> => {
  const isValue = bcrypt.compare(value, hashed);
  if (!isValue) {
    throw new HttpException(
      'Invalid credentials provided',
      HttpStatus.BAD_REQUEST,
    );
  }
  return isValue;
};

export function transformUserResponse(user: User) {
  !user[0] ? (user.password = undefined) : (user[0].password = undefined);
  return user;
}

export function isValidUUID(uuid: string): boolean {
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
}

export const convertToSeconds = (timeValue: number): number => {
  if (timeValue >= 0 && timeValue < 60) {
    return timeValue;
  } else if (timeValue >= 60 && timeValue < 3600) {
    return Math.floor(timeValue / 60) * 60 + (timeValue % 60);
  } else if (timeValue >= 3600 && timeValue < 86400) {
    return (
      Math.floor(timeValue / 3600) * 3600 +
      Math.floor((timeValue % 3600) / 60) * 60 +
      (timeValue % 60)
    );
  } else {
    throw new Error('Invalid time value');
  }
};

export const generateSecret = (length: number): string => {
  const randomBytes = crypto.randomBytes(length);
  const hexString = randomBytes.toString('hex');
  return hexString;
};

export const genTenDigits = (): string => {
  return `${Math.floor(
    Math.random() * (9999999999 - 1000000000 + 1) + 1000000000,
  )}`;
};

export const generateSlug = (value: string): string => {
  return value
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-/, '')
    .replace(/-$/, '');
};
