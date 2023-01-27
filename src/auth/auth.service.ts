import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignUpInput } from './dto/signup.input';
import { UpdateAuthInput } from './dto/update-auth.input';
import * as argon from 'argon2';
import { SignInInput } from './dto/signin.input';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signUp(signUpInput: SignUpInput) {
    const hashedPassword = await argon.hash(signUpInput.password);
    const user = await this.prisma.user.create({
      data: {
        username: signUpInput.username,
        password: hashedPassword,
        email: signUpInput.email,
      },
    });

    const { accessToken, refreshToken } = await this.createToken(
      user.id,
      user.email,
    );
    await this.updateRefreshToken(user.id, refreshToken);

    return { accessToken, refreshToken, user };
  }

  async signIn(signInInput: SignInInput) {
    const user = await this.prisma.user.findUnique({
      where: { email: signInInput.email },
    });
    if (!user) {
      throw new ForbiddenException('Access Denied');
    }

    const doPasswordsMatch = await argon.verify(
      user.password,
      signInInput.password,
    );
    if (!doPasswordsMatch) {
      throw new ForbiddenException('Access Denied');
    }
    const { accessToken, refreshToken } = await this.createToken(
      user.id,
      user.email,
    );
    await this.updateRefreshToken(user.id, refreshToken);

    return { accessToken, refreshToken, user };
  }

  async logout(userId: number) {
    await this.prisma.user.updateMany({
      where: {
        id: userId,
        NOT: {
          hashedRefreshToken: null,
        },
      },
      data: {
        hashedRefreshToken: null,
      },
    });

    return { loggedOut: true };
  }

  async createToken(userId: number, email: string) {
    const accessToken = await this.jwtService.sign(
      {
        userId,
        email,
      },
      { expiresIn: '3600s', secret: this.configService.get('JWT_SECRET') },
    );
    const refreshToken = await this.jwtService.sign(
      {
        userId,
        email,
        accessToken,
      },
      { expiresIn: '7d', secret: this.configService.get('JWT_SECRET') },
    );

    return {
      accessToken,
      refreshToken,
    };
  }

  async updateRefreshToken(userId: number, refreshToken: string) {
    const hashedRefreshToken = await argon.hash(refreshToken);
    const user = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        hashedRefreshToken,
      },
    });
  }

  async getNewTokens(userId: number, rToken: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new ForbiddenException('Access Denied');
    }
    const doRefreshTokensMatch = await argon.verify(
      user.hashedRefreshToken,
      rToken,
    );
    if (!doRefreshTokensMatch) {
      throw new ForbiddenException('Access Denied');
    }
    const { accessToken, refreshToken } = await this.createToken(
      user.id,
      user.email,
    );

    await this.updateRefreshToken(userId, refreshToken);
    return {
      accessToken,
      refreshToken,
      user,
    };
  }
}
