import {ContentType} from "@/enums/Content";
import {Chapters} from "@/components/molecules/Chapters";
import {Chapter} from "@/types/Chapter";
import {StoryTitle} from "@/components/atoms/StoryTitle";

export const ChaptersByTitles = ({chapters}: {
      chapters: Chapter[]
   }) => {
      const chaptersByTitle = {} as {
         [title: string]: Chapter[]
      };

      for (const chapter of chapters) {
         const {title, content, sibling, translation, id} = chapter;
         if (!chaptersByTitle[title]) {
            chaptersByTitle[title] = [{
               title,
               content,
               sibling,
               translation,
               id,
               chapterNumber: chapter.chapter_number || 0
            }];
         } else {
            chaptersByTitle[title].push({
               title,
               content,
               sibling,
               translation,
               id,
               chapterNumber: chapter.chapter_number || 0
            });
         }
      }

      return (
         <>
            <StoryTitle title={chapters[0]?.title}/>
            <div className="w-full flex flex-col justify-center md:flex-row md:gap-4 md:px-10 overflow-y-auto md:h-2/3">
               <Chapters chaptersByTitle={chaptersByTitle} type={ContentType.ORIGINAL}/>
            </div>
         </>
      );
   }
;
