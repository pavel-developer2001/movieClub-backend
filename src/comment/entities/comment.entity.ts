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

@Entity({ name: 'comments' })
export class CommentEntity {
  @PrimaryGeneratedColumn()
  _id: number;

  @Column({ length: 500 })
  commentText: string;

  @Column()
  spoiler: boolean;

  @Column({ default: 0 })
  countLikes: number;

  @Column({ nullable: true })
  parentId?: number;

  @ManyToOne(() => UserEntity, { eager: true })
  user: UserEntity;

  @ManyToOne(() => MovieEntity, { eager: false })
  movie: MovieEntity;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
