import { Module } from '@nestjs/common';
import { BookmarkService } from './bookmark.service';
import { BookmarkController } from './bookmark.controller';
import { BookMarkEntity } from './entities/bookmark.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([BookMarkEntity])],
  controllers: [BookmarkController],
  providers: [BookmarkService],
})
export class BookmarkModule {}
