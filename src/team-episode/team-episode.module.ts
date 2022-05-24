import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamEpisodeEntity } from './entities/team-episode.entity';
import { TeamEpisodeService } from './team-episode.service';

@Module({
  imports: [TypeOrmModule.forFeature([TeamEpisodeEntity])],
  providers: [TeamEpisodeService],
  exports: [TeamEpisodeService],
})
export class TeamEpisodeModule {}
