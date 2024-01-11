class Chapter {
    title: string;
    content: string;
    sibling: string;
    translation: string;
    id: number;
    chapterNumber?: number;

    constructor({
        title,
        content,
        sibling,
        translation,
        id,
        chapter_number
    }: { title: string, content: string, sibling: string, translation: string, id: number, chapter_number?: number }) {
        this.title = title;
        this.content = content;
        this.sibling = sibling;
        this.translation = translation;
        this.id = id;
        this.chapterNumber = chapter_number;
    }
}

export default Chapter;