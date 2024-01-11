'use client';
import {ActionButton} from "@/components/atoms/ActionButton";
import {Copy} from "@phosphor-icons/react";

export const CopyButton = ({content}: {
   content: string
}) => {
   return (
      <ActionButton label={<Copy size={24}/>} action={(onSuccess) => {
         if (typeof navigator !== "undefined") {
            navigator.clipboard.writeText(content);
            onSuccess();
         }
      }}/>
   )
}