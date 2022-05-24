import { Module, forwardRef } from '@nestjs/common';
import { TeamService } from './team.service';
import { TeamController } from './team.controller';
import { TeamEntity } from './entities/team.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { TeamMemberModule } from 'src/team-member/team-member.module';
import { TeamInvitationModule } from 'src/team-invitation/team-invitation.module';
import { TeamMemberEntity } from 'src/team-member/entities/team-member.entity';
import { TeamEpisodeEntity } from 'src/team-episode/entities/team-episode.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([TeamEntity, TeamMemberEntity,TeamEpisodeEntity]),
    forwardRef(() => CloudinaryModule),
    TeamMemberModule,
    TeamInvitationModule,
  ],
  controllers: [TeamController],
  providers: [TeamService],
  exports: [TeamService],
})
export class TeamModule {}
