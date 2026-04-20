export class UpdatePostDto {
  title?: string;
  slug?: string;
  excerpt?: string;
  coverImage?: string;
  content?: string;
  published?: boolean;
  authorId?: string;
}
