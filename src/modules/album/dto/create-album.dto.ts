import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsOptional,
  IsBoolean,
  IsNotEmpty,
  NotEquals,
} from 'class-validator';

export class CreateAlbumDto {
  @ApiProperty({
    description: 'Artist name',
    type: String,
    example: 'Freddie Mercury',
  })
  @IsString()
  @IsNotEmpty()
  @NotEquals(null)
  name: string;

  @ApiProperty({
    description: 'Year',
    type: Number,
    example: 1985,
  })
  @IsNumber()
  year: number;

  @ApiProperty({
    description: 'Artist id',
    type: String,
    example: '',
  })
  @IsOptional()
  @IsString()
  artistId: string | null; // refers to Artist

  @IsOptional()
  @IsBoolean()
  isFavorite: boolean;
}
