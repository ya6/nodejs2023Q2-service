import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean } from 'class-validator';
export class CreateArtistDto {
  @ApiProperty({
    description: 'Artist name',
    type: String,
    example: 'Freddie Mercury',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Does artist have a Grammy',
    type: Boolean,
    example: true,
  })
  @IsBoolean()
  grammy: boolean;
}
