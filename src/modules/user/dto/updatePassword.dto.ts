import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
export class UpdatePasswordDto {
  @ApiProperty({
    description: 'Old Password',
    type: String,
    example: 'pwd',
  })
  @IsString()
  oldPassword: string;
  @ApiProperty({
    description: 'New Password',
    type: String,
    example: '123',
  })
  @IsString()
  newPassword: string;
}
