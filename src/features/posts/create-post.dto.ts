export class CreatePostDto {
  title!: string;
  slug!: string;
  excerpt?: string;
  content!: string;
  published!: boolean;
  authorId!: string;
}
