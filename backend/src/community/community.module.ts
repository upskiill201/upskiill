import { Module } from '@nestjs/common';
import { NotificationModule } from '../notification/notification.module';
import { TeyModule } from '../tey/tey.module';
import { EmailModule } from '../email/email.module';
import { CommunityController } from './community.controller';
import { CommunityService } from './community.service';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { CommentService } from './comment.service';
import { FeedController } from './feed.controller';
import { FeedService } from './feed.service';
import { CommunityListener } from './listeners/community.listener';
import { CommunityAdminController } from './community-admin.controller';
import { CommunityAdminService } from './community-admin.service';

@Module({
  // TeyModule: the notify hub (push + bell). EmailModule: the job queue the
  // reply/mention emails go through.
  imports: [NotificationModule, TeyModule, EmailModule],
  // The admin controller goes first so /communities/manage is never read as an id.
  controllers: [CommunityAdminController, CommunityController, PostController, FeedController],
  providers: [CommunityService, PostService, CommentService, FeedService, CommunityListener, CommunityAdminService],
  exports: [CommunityService],
})
export class CommunityModule {}
