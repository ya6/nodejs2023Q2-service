import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';
export class UpdatePasswordDto {
  @ApiProperty({
    description: 'Old Password',
    type: String,
    example: 'pwd',
  })
  @IsString()
  oldPassword: string; // previous password
  @ApiProperty({
    description: 'New Password',
    type: String,
    example: '123',
  })
  @IsString()
  newPassword: string; // new password
}
