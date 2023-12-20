import {ContentType} from "@/enums/Content";
import {noop} from "lodash";
import classNames from "classnames";
import {useState} from "react";
import {FloppyDisk, Spinner} from "@phosphor-icons/react";
import {ActionButton} from "@/components/atoms/ActionButton";

export const EditButton = ({
   content,
   translation,
   chapterId,
   onSuccess = noop,
   type,
   isDisabled = false
}: {
   content: string,
   translation?: string,
   type: ContentType,
   onSuccess?: () => void,
   onError?: () => void,
   isDisabled?: boolean,
   chapterId?: number
}) => {
   const notAllowed = isDisabled || !content || !chapterId;

   return (
      <ActionButton
         label={<FloppyDisk size={24}/>}
         isDisabled={notAllowed}
         action={async () => {
            if (content) {
               await fetch("/story/update", {
                  method: "POST", body: JSON.stringify({
                     chapterId: chapterId,
                     content: content,
                  })
               });
            }

            if (translation) {
               await fetch("/story/translate/update", {
                  method: "POST",
                  body: JSON.stringify({
                     chapterId,
                     content: translation
                  })
               });
            }

            onSuccess();
         }}/>
   )
}