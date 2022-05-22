import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { UserEntity } from 'src/user/entities/user.entity';
import { RegisterUserDto } from 'src/user/dto/register-user.dto';
import { TokenService } from 'src/token/token.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private tokenService: TokenService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findUser({ email, password });
    const isMatch = await bcrypt.compare(password, user.password);
    if (user && isMatch) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async register(registerUserDto: RegisterUserDto) {
    const createUser = await this.usersService.create(registerUserDto);
    const payload = { email: createUser.email, sub: createUser._id };
    const tokens = this.tokenService.generateTokens(payload);
    await this.tokenService.saveToken(createUser._id, tokens.refreshToken);
    return { ...createUser, ...tokens };
  }
  async login(user: UserEntity) {
    const payload = { email: user.email, sub: user._id };
    const tokens = this.tokenService.generateTokens(payload);
    await this.tokenService.saveToken(user._id, tokens.refreshToken);
    return { ...user, ...tokens };
  }
  async logout(refreshToken) {
    const token = await this.tokenService.removeToken(refreshToken);
    return token;
  }
  async refresh(refreshToken) {
    if (!refreshToken) {
      throw new HttpException('Токен не найден 1!', HttpStatus.FORBIDDEN);
    }
    const userData = this.tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await this.tokenService.findToken(refreshToken);
    if (!userData || !tokenFromDb) {
      throw new HttpException('Токен не найден 2!', HttpStatus.FORBIDDEN);
    }
    const user = await this.usersService.findById(userData._id);
    const payload = { email: user.email, sub: user._id };
    const tokens = this.tokenService.generateTokens(payload);

    await this.tokenService.saveToken(user._id, tokens.refreshToken);
    return { ...tokens, user };
  }

  async googleLogin(req) {
    try {
      // if (!req.user) {
      //   return 'No user from google';
      // }
      const createUser = await this.usersService.googleAuth(req.user);
      const payload = { email: createUser.email, sub: createUser._id };
      const tokens = this.tokenService.generateTokens(payload);
      await this.tokenService.saveToken(createUser._id, tokens.refreshToken);
      return { ...createUser, ...tokens };
    } catch (error) {
      console.log(error);
    }
  }
}
