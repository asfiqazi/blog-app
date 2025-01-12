import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService) {}

  async create(authorId: number, createCommentDto: CreateCommentDto) {
    const post = await this.prisma.post.findUnique({
      where: { id: createCommentDto.postId },
    });

    if (!post) {
      throw new NotFoundException(`Post with ID ${createCommentDto.postId} not found`);
    }

    return this.prisma.comment.create({
      data: {
        ...createCommentDto,
        authorId,
        approved: false, // Comments require moderation by default
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async findAll(postId: number, page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    const [comments, total] = await Promise.all([
      this.prisma.comment.findMany({
        where: { 
          postId,
          approved: true 
        },
        skip,
        take: limit,
        include: {
          author: {
            select: {
              id: true,
              name: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      }),
      this.prisma.comment.count({
        where: { 
          postId,
          approved: true 
        },
      }),
    ]);

    return {
      comments,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: number) {
    const comment = await this.prisma.comment.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            id: true,
            name: true,
          },
        },
        post: true,
      },
    });

    if (!comment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }

    return comment;
  }

  async update(id: number, authorId: number, updateCommentDto: UpdateCommentDto) {
    const comment = await this.prisma.comment.findUnique({
      where: { id },
    });

    if (!comment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }

    if (comment.authorId !== authorId) {
      throw new ForbiddenException('You are not authorized to update this comment');
    }

    return this.prisma.comment.update({
      where: { id },
      data: updateCommentDto,
    });
  }

  async remove(id: number, authorId: number, userRole: string) {
    const comment = await this.prisma.comment.findUnique({
      where: { id },
    });

    if (!comment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }

    // Allow deletion if user is the comment author or an admin
    if (comment.authorId !== authorId && userRole !== 'ADMIN') {
      throw new ForbiddenException('You are not authorized to delete this comment');
    }

    await this.prisma.comment.delete({
      where: { id },
    });
  }

  // Admin method to moderate comments
  async moderateComment(id: number, approved: boolean) {
    const comment = await this.prisma.comment.findUnique({
      where: { id },
    });

    if (!comment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }

    return this.prisma.comment.update({
      where: { id },
      data: { approved },
    });
  }
}
