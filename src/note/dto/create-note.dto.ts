import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength } from 'class-validator';

export class CreateNoteDto {
  @ApiProperty({
    description: 'Title',
    minLength: 2,
  })
  @MinLength(2)
  @IsNotEmpty()
  readonly title: string;

  @ApiProperty({
    description: 'Description',
    minLength: 2,
  })
  @MinLength(2)
  @IsNotEmpty()
  readonly description: string;
}
