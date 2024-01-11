'use client';
import {useState} from "react";

export const StoryTitle = ({title: initialTitle}: {
   title: string
}) => {
   const [title, setTitle] = useState<string>(initialTitle);
   return (
      <div dir="auto">
         <textarea
            className="text-5xl font-bold w-full font-mono italic mt-10 px-20 h-32 resize-none w-9/12 bg-transparent"
            defaultValue={title}/>
         {/*<TranslateButton content={title} onTranslate={setTitleTranslation}/>*/}
         {/*<EditButton*/}
         {/*   // FIXME: Either update for each chapter - or the title should be a different entity*/}
         {/*   // chapterId={chaptersOfTitle[0].id}*/}
         {/*   content={title}*/}
         {/*   type={ContentType.ORIGINAL}*/}
         {/*   onSuccess={setTitle}/>*/}
      </div>
   )
}