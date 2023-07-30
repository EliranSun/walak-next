export default interface Post {
   id: number;
   title: string;
   content: string;
   createdAt: Date;
   authorId: number;
   excerpt?: string;
   imageSrc: string;
}