import {ActionButton} from "@/components/atoms/ActionButton";
import {Trash} from "@phosphor-icons/react";

export const DeleteChapterButton = ({chapterId}: {
   chapterId: number
}) => {
   return (
      <ActionButton label={<Trash color="red" size={24}/>} action={async () => {
         await fetch(`/story/v2/chapter`, {
            method: "PATCH",
            body: JSON.stringify({chapterId}),
            headers: {
               "Content-Type": "application/json"
            },
         });
      }}/>
   );
};
