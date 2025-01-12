import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Request() req, @Body() createCommentDto: CreateCommentDto) {
    return this.commentsService.create(req.user.userId, createCommentDto);
  }

  @Get('post/:postId')
  findAll(
    @Param('postId') postId: string,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ) {
    return this.commentsService.findAll(+postId, +page, +limit);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentsService.findOne(+id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Request() req,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    return this.commentsService.update(+id, req.user.userId, updateCommentDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.commentsService.remove(+id, req.user.userId, req.user.role);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post(':id/moderate')
  moderateComment(
    @Param('id') id: string,
    @Body('approved') approved: boolean,
    @Request() req,
  ) {
    // Ensure only admins can moderate comments
    if (req.user.role !== 'ADMIN') {
      throw new Error('Only admins can moderate comments');
    }
    return this.commentsService.moderateComment(+id, approved);
  }
}
