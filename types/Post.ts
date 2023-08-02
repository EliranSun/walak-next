import Author from "@/types/Author";

type Category = 1 | 2 | 3 | 4;

export default interface Post {
   id: number;
   title: string;
   content: string;
   createdAt: Date;
   authorId: number;
   excerpt?: string;
   imageSrc: string;
   timeToRead?: number;
   isInteractive?: boolean;
   viewsCount?: number;
   upscaledImageSrc?: string;
   tags?: string[];
   author?: Author;
   hasVideo?: boolean;
   categoryId: Category;
   highlights: string[];
}