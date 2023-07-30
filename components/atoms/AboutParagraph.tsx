'use client';
import {useTranslations} from "next-intl";
import {useMemo} from "react";

export const AboutParagraph = ({isShort}: { isShort?: boolean }) => {
   const t = useTranslations('About');
   const text = useMemo(() => {
      let key = 'full';
      if (isShort) {
         key = 'short';
      }

      return t.rich(key, {
         p: (chunks) => <p>{chunks}</p>,
         strong: (chunks) => <strong>{chunks}</strong>
      });
   }, [isShort]);

   return (
      <div className="max-w-sm text-sm">
         {text}
      </div>
   )
}