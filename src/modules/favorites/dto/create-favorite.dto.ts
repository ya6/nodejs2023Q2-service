import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, IsArray } from 'class-validator';
export class CreateFavoriteDto {
  @ApiProperty({
    description: 'Artist',
  })
  @IsOptional()
  artists: any;

  @ApiProperty({
    description: 'Album',
  })
  @IsOptional()
  albums: any;

  @ApiProperty({
    description: 'Track',
  })
  @IsOptional()
  tracks: any;
}
