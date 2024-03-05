import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { comparePasswords } from 'src/utils/bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userServive: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userServive.getByEmail(email);

    if (user) {
      const matched = comparePasswords(password, user.password);
      console.log(user.password);

      console.log(matched);

      if (matched) {
        return user;
      }
    }

    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.userId };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
