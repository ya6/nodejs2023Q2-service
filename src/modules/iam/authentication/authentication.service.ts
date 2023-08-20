import {
  ConflictException,
  ForbiddenException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { HashingService } from '../hashing/hashing.service';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from '../config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { ActiveUserData } from '../interfaces/active-user-data.interface';

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly hashService: HashingService,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  async signUp(signUpDto: SignUpDto) {
    const { login, password: rawPassword } = signUpDto;
    try {
      const user = new User();
      user.login = login;
      user.password = await this.hashService.hash(rawPassword);

      const { password, ...savedUser } = await this.userRepository.save(user);
      return { ...savedUser };
    } catch (error) {
      const pgUniqueViolationErrorCode = '23505';
      if (error.code === pgUniqueViolationErrorCode) {
        throw new ConflictException('User exists');
      }
      throw error;
    }
  }
  async login(signInDto: SignInDto) {
    const { login, password } = signInDto;
    const user = await this.userRepository.findOne({ where: { login } });

    if (!user) {
      // throw new UnauthorizedException('User does not exists');
      throw new ForbiddenException('User does not exists');
    }
    const isEqual = await this.hashService.compare(password, user.password);
    if (!isEqual) {
      // throw new UnauthorizedException('Password does not match');
      throw new ForbiddenException('Password does not match');
    }
    const accessToken = await this.jwtService.signAsync(
      {
        sub: user.id,
        login: user.login,
      } as ActiveUserData,
      {
        // audience: this.jwtConfiguration.audience,
        // issuer: this.jwtConfiguration.issuer,
        secret: this.jwtConfiguration.secret,
        expiresIn: this.jwtConfiguration.accessTokenTtl,
      },
    );
    return {
      accessToken,
    };
  }
}
