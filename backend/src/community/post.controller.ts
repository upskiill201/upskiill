import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Throttle } from '@nestjs/throttler';
import { PostService } from './post.service';
import { CommentService } from './comment.service';
import {
  CreateCommentDto,
  CreatePostDto,
  ModerationFlagDto,
  UpdateCommentDto,
  UpdatePostDto,
  VotePollDto,
} from './dto/community.dto';

@UseGuards(AuthGuard('jwt'))
@Controller()
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly commentService: CommentService,
  ) {}

  // ── Posts ──────────────────────────────────────────────────────────────────

  /** GET /communities/:id/posts?sort=new|top|unanswered&type&lessonId */
  @Get('communities/:id/posts')
  async listPosts(
    @Req() req: any,
    @Param('id') communityId: string,
    @Query('page') page?: string,
    @Query('pageSize') pageSize?: string,
    @Query('sort') sort?: 'new' | 'top' | 'unanswered',
    @Query('type') type?: string,
    @Query('lessonId') lessonId?: string,
  ) {
    return this.postService.listPosts(
      communityId,
      { id: req.user.id as string, role: req.user.role },
      {
        page: page ? parseInt(page, 10) : undefined,
        pageSize: pageSize ? parseInt(pageSize, 10) : undefined,
        sort,
        postType: type,
        lessonId,
      },
    );
  }

  /** POST /communities/:id/posts — rate limited harder than reads. */
  @Throttle({ default: { limit: 10, ttl: 60_000 } })
  @Post('communities/:id/posts')
  async createPost(
    @Req() req: any,
    @Param('id') communityId: string,
    @Body() dto: CreatePostDto,
  ) {
    return this.postService.createPost(communityId, { id: req.user.id as string, role: req.user.role }, dto);
  }

  @Get('posts/:postId')
  async getPost(@Req() req: any, @Param('postId') postId: string) {
    return this.postService.getPost(postId, { id: req.user.id as string, role: req.user.role });
  }

  @Patch('posts/:postId')
  async updatePost(
    @Req() req: any,
    @Param('postId') postId: string,
    @Body() dto: UpdatePostDto,
  ) {
    return this.postService.updatePost(postId, { id: req.user.id as string, role: req.user.role }, dto);
  }

  @Delete('posts/:postId')
  async deletePost(@Req() req: any, @Param('postId') postId: string) {
    return this.postService.deletePost(postId, { id: req.user.id as string, role: req.user.role });
  }

  @Post('posts/:postId/pin')
  async setPinned(
    @Req() req: any,
    @Param('postId') postId: string,
    @Body() dto: ModerationFlagDto,
  ) {
    return this.postService.setPinned(postId, { id: req.user.id as string, role: req.user.role }, dto.value ?? true);
  }

  @Post('posts/:postId/lock')
  async setLocked(
    @Req() req: any,
    @Param('postId') postId: string,
    @Body() dto: ModerationFlagDto,
  ) {
    return this.postService.setLocked(postId, { id: req.user.id as string, role: req.user.role }, dto.value ?? true);
  }

  @Post('posts/:postId/like')
  async likePost(@Req() req: any, @Param('postId') postId: string) {
    return this.postService.likePost(postId, req.user.id as string, req.user.role);
  }

  @Delete('posts/:postId/like')
  async unlikePost(@Req() req: any, @Param('postId') postId: string) {
    return this.postService.unlikePost(postId, req.user.id as string, req.user.role);
  }

  /** POST /posts/:postId/vote — one vote per user per poll. */
  @Throttle({ default: { limit: 30, ttl: 60_000 } })
  @Post('posts/:postId/vote')
  async votePoll(
    @Req() req: any,
    @Param('postId') postId: string,
    @Body() dto: VotePollDto,
  ) {
    return this.postService.votePoll(postId, { id: req.user.id as string, role: req.user.role }, dto.optionId);
  }

  // ── Comments ───────────────────────────────────────────────────────────────

  @Get('posts/:postId/comments')
  async listComments(
    @Req() req: any,
    @Param('postId') postId: string,
    @Query('page') page?: string,
    @Query('pageSize') pageSize?: string,
  ) {
    return this.commentService.listComments(
      postId,
      { id: req.user.id as string, role: req.user.role },
      {
        page: page ? parseInt(page, 10) : undefined,
        pageSize: pageSize ? parseInt(pageSize, 10) : undefined,
      },
    );
  }

  @Throttle({ default: { limit: 20, ttl: 60_000 } })
  @Post('posts/:postId/comments')
  async addComment(
    @Req() req: any,
    @Param('postId') postId: string,
    @Body() dto: CreateCommentDto,
  ) {
    return this.commentService.addComment(postId, { id: req.user.id as string, role: req.user.role }, dto);
  }

  /** GET /comments/:commentId — location resolver for notification deep-links. */
  @Get('comments/:commentId')
  async getCommentLocation(@Param('commentId') commentId: string) {
    return this.commentService.getCommentLocation(commentId);
  }

  @Patch('comments/:commentId')
  async updateComment(
    @Req() req: any,
    @Param('commentId') commentId: string,
    @Body() dto: UpdateCommentDto,
  ) {
    return this.commentService.updateComment(commentId, { id: req.user.id as string, role: req.user.role }, dto);
  }

  @Delete('comments/:commentId')
  async deleteComment(@Req() req: any, @Param('commentId') commentId: string) {
    return this.commentService.deleteComment(commentId, { id: req.user.id as string, role: req.user.role });
  }

  @Post('comments/:commentId/like')
  async likeComment(@Req() req: any, @Param('commentId') commentId: string) {
    return this.commentService.likeComment(commentId, req.user.id as string, req.user.role);
  }

  @Delete('comments/:commentId/like')
  async unlikeComment(@Req() req: any, @Param('commentId') commentId: string) {
    return this.commentService.unlikeComment(commentId, req.user.id as string, req.user.role);
  }
}
