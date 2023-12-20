'use client';
import {useState} from "react";
import {ContentType} from "@/enums/Content";
import {ContentActionButtons} from "@/components/molecules/ContentActionButtons";
import {ChapterText} from "@/components/atoms/ChapterText";

export const Chapter = ({
      id,
      content,
      translation: initialTranslation,
      type
   }: {
      id: number,
      content: string,
      chapterNumber: number,
      translation: string,
      type: ContentType
   }) => {
      const [translation, setTranslation] = useState<string>(initialTranslation);
      const [editedContent, setEditedContent] = useState<string>(content);


      if (!content) {
         return null;
      }

      return (
         <div className="flex bg-white p-8 w-full h-fit md:w-fit bg-white shadow-md my-4">
            <div className="flex items-start justify-center gap-4  md:max-w-[1400px]">
               <ChapterText text={editedContent} onChange={setEditedContent}/>
               <ChapterText text={translation} onChange={setTranslation} dir="rtl"/>
            </div>
            <ContentActionButtons
               chapterId={id}
               translation={translation}
               type={type} content={editedContent} setTranslation={setTranslation}/>
         </div>
      );
   }
;