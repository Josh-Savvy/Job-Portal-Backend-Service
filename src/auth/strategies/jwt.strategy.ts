import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: `${process.env.JWT_ENCRYPTION_KEY}`,
    });
  }
  async validate(validatePayload: {
    email: string;
    sub: string;
  }): Promise<any> {
    const user = await this.userService.findOne(validatePayload.email);
    if (!user) throw new UnauthorizedException();
    return user;
  }
}
