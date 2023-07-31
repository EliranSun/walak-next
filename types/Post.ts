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
}