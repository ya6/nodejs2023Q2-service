import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, NotEquals } from 'class-validator';
export class CreateUserDto {
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
  @IsString()
  @IsNotEmpty()
  @NotEquals(null)
  password: string;
}
