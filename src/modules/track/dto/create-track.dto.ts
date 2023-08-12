import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsNumber,
  IsBoolean,
  IsNotEmpty,
  NotEquals,
} from 'class-validator';
export class CreateTrackDto {
  @ApiProperty({
    description: 'Track name',
    type: String,
    example: "Don't stop me now",
  })
  @IsString()
  @IsNotEmpty()
  @NotEquals(null)
  name: string;

  @ApiProperty({
    description: 'Artist id',
    type: String,
    example: '',
  })
  @IsOptional()
  @IsString()
  artistId: string | null; // refers to Artist

  @ApiProperty({
    description: 'Album id',
    type: String,
    example: '',
  })
  @IsOptional()
  @IsString()
  albumId: string | null; // refers to Album

  @ApiProperty({
    description: 'Duration',
    type: Number,
    example: 202,
  })
  @IsNumber()
  duration: number; // integer number

  @IsOptional()
  @IsBoolean()
  isFavorite: boolean;
}
