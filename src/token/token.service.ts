import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TokenEntity } from './entities/token.entity';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(TokenEntity)
    private repository: Repository<TokenEntity>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}
  generateTokens(payload) {
    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_ACCESS_SECRET'),
      expiresIn: '15m',
    });
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_SECRET'),
      expiresIn: '30d',
    });
    return {
      accessToken,
      refreshToken,
    };
  }

  validateAccessToken(token) {
    try {
      const userData = this.jwtService.verify(token, {
        secret: this.configService.get('JWT_ACCESS_SECRET'),
      });
      return userData;
    } catch (e) {
      return null;
    }
  }

  validateRefreshToken(token) {
    try {
      const userData = this.jwtService.verify(token, {
        secret: this.configService.get('JWT_REFRESH_SECRET'),
      });
      return userData;
    } catch (e) {
      return null;
    }
  }

  async saveToken(userId, refreshToken) {
    const tokenData = await this.repository.findOne({ user: { _id: userId } });
    if (tokenData) {
      const update = await this.repository.update(tokenData._id, {
        refreshToken,
      });

      return update;
    }
    const token = await this.repository.save({
      user: { _id: userId },
      refreshToken,
    });
    return token;
  }

  async removeToken(refreshToken) {
    const token = await this.repository.findOne({ where: { refreshToken } });
    if (!token) {
      throw new HttpException('Токен не найден', HttpStatus.NOT_FOUND);
    }
    const tokenData = await this.repository.delete(token._id);
    return tokenData;
  }

  async findToken(refreshToken) {
    const tokenData = await this.repository.findOne({
      where: { refreshToken },
    });
    return tokenData;
  }
}
