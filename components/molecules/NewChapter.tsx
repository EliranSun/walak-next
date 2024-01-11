'use client';
import {RadioButton} from "@/components/atoms/RadioButton";
import {generateNewChapter, saveNewChapters} from "@/utils/chapter";
import {useState} from "react";
import {ActionButton} from "@/components/atoms/ActionButton";
import {ChapterText} from "@/components/atoms/ChapterText";

export const NewChapter = ({
   personName,
   theStoryThusFar = "",
   theme = "",
   genre = "",
   title = ""
}: {
   personName: string,
   theStoryThusFar: string,
   theme: string,
   genre: string,
   title: string,
}) => {
   const [isLoading, setIsLoading] = useState(false);
   const [lastPlayerChoice, setLastPlayerChoice] = useState(0);
   const [newChapter, setNewChapter] = useState<{
      content: string,
      translation: string,
   }>({
      content: '',
      translation: '',
   });

   return (
      <div>
         <div className="w-full border-4 border-black min-w-[500px] border-dashed w-fit m-auto p-8">
            <h2 className="text-5xl w-full text-center mb-4">{personName.toUpperCase()} CHOOSE:</h2>
            <div className="flex items-center justify-center gap-4 w-full m-auto">
               <RadioButton
                  label="Option 1"
                  value={1}
                  name="choice"
                  isChecked={lastPlayerChoice === 1}
                  onClick={() => setLastPlayerChoice(1)}/>
               <RadioButton
                  label="Option 2"
                  value={2}
                  name="choice"
                  isChecked={lastPlayerChoice === 2}
                  onClick={() => setLastPlayerChoice(2)}/>
            </div>
         </div>
         <div className="flex flex-col justify-center w-1/2 m-auto my-4">
            <ActionButton
               type="primary"
               label="GENERATE NEW CHAPTER"
               action={async () => {
                  if (!lastPlayerChoice) {
                     alert('Please choose an option.');
                  }

                  await generateNewChapter({
                     siblingName: personName,
                     genre,
                     theme,
                     previousChapters: theStoryThusFar,
                     readerChoice: lastPlayerChoice,
                  }, {
                     onSuccess: (results) => {
                        setIsLoading(false);
                        setNewChapter({
                           content: results.content,
                           translation: results.translation,
                        });
                     },
                     onError: (error) => {
                        console.error(error);
                        setIsLoading(false);
                     }
                  });
               }}/>
            <p className="text-xl w-1/2 min-w-[500px] m-auto my-4 text-center">
               {title} <br/>
               {genre} <br/>
               {theme}
            </p>
         </div>
         {newChapter.content ?
            <div className="w-2/3 flex flex-col justify-center m-auto my-10 p-8 bg-white shadow-xl">
               <div className="w-full flex">
                  <ChapterText
                     text={newChapter.content}
                     onChange={value => setNewChapter(prev => {
                        return {
                           ...prev,
                           content: value,
                        };
                     })}/>
                  <ChapterText
                     dir="rtl"
                     text={newChapter.translation}
                     onChange={value => setNewChapter(prev => {
                        return {
                           ...prev,
                           content: value,
                        };
                     })}/>
               </div>
               <ActionButton
                  label="SAVE CHAPTER"
                  type="primary"
                  action={async () => {
                     await saveNewChapters({
                        title,
                        personName,
                        genre,
                        theme,
                        chapters: [
                           {
                              content: newChapter.content,
                              translation: newChapter.translation,
                           }
                        ]
                     })
                  }}/>
            </div> : null}
      </div>
   );
};