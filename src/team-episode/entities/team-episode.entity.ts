import { EpisodeEntity } from 'src/episode/entities/episode.entity';
import { MovieEntity } from 'src/movie/entities/movie.entity';
import { TeamEntity } from 'src/team/entities/team.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity({ name: 'teams-episodes', schema: 'public' })
export class TeamEpisodeEntity {
  @PrimaryGeneratedColumn()
  _id: number;

  @ManyToOne(() => TeamEntity, { eager: true })
  team: TeamEntity;

  @ManyToOne(() => MovieEntity, { eager: false })
  movie: MovieEntity;

  @ManyToOne(() => EpisodeEntity, { eager: false })
  episode: EpisodeEntity;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
