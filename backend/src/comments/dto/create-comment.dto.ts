import { IsString, IsNotEmpty, MinLength, IsInt, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  content: string;

  @ApiProperty()
  @IsInt()
  @IsPositive()
  postId: number;
}
