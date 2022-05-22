export class CreateCommentDto {
  commentText: string;
  spoiler: boolean;
  movieId: number;
  parentId?: number;
}
