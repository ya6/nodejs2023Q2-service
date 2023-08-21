import { Injectable } from '@nestjs/common';
import { HashingService } from './hashing.service';
import { hash, genSalt, compare } from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class BcriptService implements HashingService {
  constructor(private configService: ConfigService) {}
  async hash(data: string | Buffer): Promise<string> {
    const salt = await genSalt();
    // const salt = this.configService.get('CRYPT_SALT');
    return hash(data, salt);
  }
  compare(data: string | Buffer, encrypted: string): Promise<boolean> {
    return compare(data, encrypted);
  }
}
