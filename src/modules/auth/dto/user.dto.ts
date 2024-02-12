import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UserDto {
  @ApiProperty({
    description: 'Username',
  })
  @IsNotEmpty()
  readonly username: string;

  @ApiProperty({
    description: 'Password',
  })
  @IsNotEmpty()
  readonly password: string;
}
