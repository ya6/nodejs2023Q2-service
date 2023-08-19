import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, NotEquals } from 'class-validator';
import { Exclude } from 'class-transformer';
export class ResponseUserDto {
  id: string;
  login: string;

  @Exclude()
  password: string;
  createdAt: number;
  updatedAt: number;
  constructor(partial: Partial<ResponseUserDto>) {
    Object.assign(this, partial);
  }
}
