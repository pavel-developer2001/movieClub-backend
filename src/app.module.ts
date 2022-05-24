import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getPosgresConfig } from './config/postgres.config';
import { TokenModule } from './token/token.module';
import { MovieModule } from './movie/movie.module';
import { GenreModule } from './genre/genre.module';
import { EpisodeModule } from './episode/episode.module';
import { CommentModule } from './comment/comment.module';
import { RatingModule } from './rating/rating.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { TeamModule } from './team/team.module';
import { TeamMemberModule } from './team-member/team-member.module';
import { TeamInvitationModule } from './team-invitation/team-invitation.module';
import { TeamEpisodeModule } from './team-episode/team-episode.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getPosgresConfig,
    }),
    UserModule,
    AuthModule,
    TokenModule,
    MovieModule,
    GenreModule,
    EpisodeModule,
    CommentModule,
    RatingModule,
    BookmarkModule,
    TeamModule,
    TeamMemberModule,
    TeamInvitationModule,
    TeamEpisodeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
