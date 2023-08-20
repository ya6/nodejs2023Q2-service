import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength, NotEquals } from 'class-validator';
export class SignUpDto {
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
