import { IsString, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  content: string;

  @ApiProperty({ required: false, default: false })
  published?: boolean = false;
}
