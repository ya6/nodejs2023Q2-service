import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
export class CreateUserDto {
  @ApiProperty({
    description: 'Login',
    type: String,
    example: 'Alex',
  })
  @IsString()
  login: string;

  @ApiProperty({
    description: 'Login',
    type: String,
    example: 'pasword',
  })
  @IsString()
  password: string;
}
