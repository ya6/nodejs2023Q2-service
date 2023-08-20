import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';
export class SignInDto {
  @ApiProperty({
    description: 'Login',
    type: String,
    example: 'Alex',
  })
  @IsString()
  login: string;

  @ApiProperty({
    description: 'pasword',
    type: String,
    example: 'pasword',
  })
  @MinLength(3)
  password: string;
}
