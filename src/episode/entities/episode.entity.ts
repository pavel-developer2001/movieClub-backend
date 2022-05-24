import { MovieEntity } from 'src/movie/entities/movie.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity({ name: 'episodes' })
export class EpisodeEntity {
  @PrimaryGeneratedColumn()
  _id: number;

  @Column({ nullable: true })
  url?: string;

  @Column({ nullable: true })
  season?: string;

  @Column({ nullable: true })
  episode?: string;

  @ManyToOne(() => UserEntity, { eager: false })
  user: UserEntity;

  @ManyToOne(() => MovieEntity, { eager: false })
  movie: MovieEntity;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
