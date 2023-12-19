import { ContentType } from "@/enums/Content";
import { ChaptersOfTitle } from "@/components/molecules/ChaptersOfTItle";
import { Chapter } from "@/types/Chapter";

export const ChaptersByTitles = ({ chapters }: { chapters: Chapter[] }) => {
        const chaptersByTitle = {} as { [title: string]: Chapter[] };

        for (const chapter of chapters) {
            const { title, content, sibling, translation, id } = chapter;
            if (!chaptersByTitle[title]) {
                chaptersByTitle[title] = [{
                    title,
                    content,
                    sibling,
                    translation,
                    id,
                    chapterNumber: chapter.chapter_number
                }];
            } else {
                chaptersByTitle[title].push({
                    title,
                    content,
                    sibling,
                    translation,
                    id,
                    chapterNumber: chapter.chapter_number
                });
            }
        }

        return (
            <div className="flex gap-4 p-10 overflow-y-auto h-2/3">
                <ChaptersOfTitle chaptersByTitle={chaptersByTitle} type={ContentType.ORIGINAL}/>
                <ChaptersOfTitle chaptersByTitle={chaptersByTitle} type={ContentType.TRANSLATION}/>
            </div>
        );
    }
;
