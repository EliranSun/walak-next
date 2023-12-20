import {TranslateButton} from "@/components/atoms/TranslateButton";
import {EditButton} from "@/components/atoms/EditButton";
import {ContentType} from "@/enums/Content";
import {ButtonPosition} from "@/enums/ButtonPosition";
import classNames from "classnames";
import {DeleteChapterButton} from "@/components/atoms/DeleteChapterButton";
import {ActionButton} from "@/components/atoms/ActionButton";
import {CopyButton} from "@/components/atoms/CopyButton";

export const ContentActionButtons = ({
   type,
   content,
   translation,
   setTranslation,
   chapterId
}: {
   type: ContentType,
   translation: string,
   content: string,
   setTranslation: (translation: string) => void,
   chapterId: number
}) => {
   const buttonPosition = type === ContentType.ORIGINAL ? ButtonPosition.Right : ButtonPosition.Left;

   return (
      <div className={classNames("flex flex-col items-start gap-4 mb-4", {
         "float-right": buttonPosition === ButtonPosition.Right,
         "float-left": buttonPosition === ButtonPosition.Left
      })}>
         <EditButton
            chapterId={chapterId}
            translation={translation}
            content={content}
            type={type}
            isDisabled={!content}/>
         <TranslateButton content={content} onTranslate={setTranslation}/>
         <CopyButton content={translation}/>
         <DeleteChapterButton chapterId={chapterId}/>
      </div>
   )
}