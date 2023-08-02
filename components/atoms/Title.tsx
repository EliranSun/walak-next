'use client';
import React from "react";
import {useTranslations} from "next-intl";

export const MainTitle = ({translationKey}: { translationKey: string }) => {
   const t = useTranslations('Titles');
   return (
      <h1 className="font-black text-9xl open-sans">{t(translationKey)}</h1>
   )
};
