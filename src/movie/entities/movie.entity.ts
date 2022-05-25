import { GenreEntity } from 'src/genre/entities/genre.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
} from 'typeorm';

@Entity({ name: 'movies' })
export class MovieEntity {
  @PrimaryGeneratedColumn()
  _id: number;

  @Column()
  title: string;

  @Column()
  englishTitle: string;

  @Column()
  description: string;

  @Column({ nullable: true })
  status: string;

  @Column({ nullable: true })
  cover: string;

  @Column()
  year: number;

  @Column()
  munites: number;

  @Column()
  country: string;

  @Column()
  age: string;

  @Column()
  type: string;

  @ManyToOne(() => UserEntity, { eager: false })
  user: UserEntity;

  @ManyToMany((type) => GenreEntity, (genre) => genre.movies, {
    cascade: true,
    eager: true,
  })
  @JoinTable()
  genres: GenreEntity[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
