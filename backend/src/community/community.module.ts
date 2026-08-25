import { Module } from '@nestjs/common';
import { NotificationModule } from '../notification/notification.module';
import { CommunityController } from './community.controller';
import { CommunityService } from './community.service';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { CommentService } from './comment.service';
import { FeedController } from './feed.controller';
import { FeedService } from './feed.service';
import { CommunityListener } from './listeners/community.listener';

@Module({
  imports: [NotificationModule],
  controllers: [CommunityController, PostController, FeedController],
  providers: [CommunityService, PostService, CommentService, FeedService, CommunityListener],
  exports: [CommunityService],
})
export class CommunityModule {}
