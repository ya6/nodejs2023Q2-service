import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';
export class uuidDto {
  @ApiProperty({
    description: 'id uuid v4',
    type: String,
    example: 'b42ca906-b273-4315-97a0-0df2352aa6eb',
  })
  @IsUUID()
  id: string;
}
