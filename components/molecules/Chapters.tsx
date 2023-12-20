'use client';

import {ContentType} from "@/enums/Content";
import {TranslateButton} from "@/components/atoms/TranslateButton";
import {Chapter as ChapterType} from "@/types/Chapter";
import {useState} from "react";
import {Chapter} from "@/components/molecules/Chapter";
import {EditButton} from "@/components/atoms/EditButton";
import {noop} from "lodash";
import {StoryTitle} from "@/components/atoms/StoryTitle";

export const Chapters = ({
      chaptersByTitle,
      type
   }: {
      chaptersByTitle: {
         [title: string]: ChapterType[]
      },
      type: ContentType
   }) => {
      const [titleTranslation, setTitleTranslation] = useState<string>("");

      return (
         <div className="md:flex md:flex-col p-8">
            {Object.entries(chaptersByTitle).map(([title, chaptersOfTitle]) => {
               return (
                  <div key={title}>
                     {chaptersOfTitle.map(({title, id, chapterNumber, content, translation}) => {
                        return (
                           <Chapter
                              // @ts-ignore-next-line
                              title={title}
                              id={id}
                              key={`${id}-chapter`}
                              translation={translation}
                              chapterNumber={chapterNumber}
                              type={type}
                              content={content}/>
                        );
                     })}
                  </div>
               )
            })}
         </div>
      );
   }
;