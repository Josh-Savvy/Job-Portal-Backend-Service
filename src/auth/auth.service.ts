import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { compareHash } from 'common/utils';
import { CreateUserInput } from 'src/user/dto/create-user.input';
import { UserType } from 'src/user/types/user.type';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  async createUser(createUserInput: CreateUserInput) {
    return await this.userService.create(createUserInput);
  }
  async validate(email: string, userPassword: string): Promise<UserType> {
    const user = await this.userService.findOne(email);
    if (!user || !user.password) {
      throw new HttpException('AUTH_INVALID_EMAIL', HttpStatus.BAD_REQUEST);
    }
    const passwordMatch = await compareHash(userPassword, user.password);
    if (!passwordMatch) {
      throw new HttpException('AUTH_INVALID_PIN', HttpStatus.BAD_REQUEST);
    }
    user.password = null;
    return passwordMatch ? user : null;
  }
  async login(user: UserType): Promise<{
    accessToken: string | null;
    refreshToken: string | null;
  }> {
    const { email } = user;
    const jwtPayload = { email: email, sub: user.id };
    return {
      accessToken: await this.jwtService.sign(jwtPayload, {
        secret: `${process.env.JWT_ENCRYPTION_KEY}`,
        expiresIn: '3600s',
      }),
      refreshToken: '',
    };
  }
}
