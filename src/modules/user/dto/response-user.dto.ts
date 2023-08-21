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
