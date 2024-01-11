import {useEffect, useRef} from 'react';

export const ChapterText = ({text, onChange, dir}: {
   text: string,
   onChange: (text: string) => void,
   dir?: 'rtl' | 'auto'
}) => {
   const ref = useRef<HTMLTextAreaElement>(null);

   useEffect(() => {
      if (ref.current) {
         ref.current.style.height = ref.current.scrollHeight + "px";
      }
   }, [ref]);

   return (
      <textarea
         value={text}
         ref={ref}
         dir={dir}
         onChange={(e) => onChange(e.target.value || "")}
         className="w-full md:w-[40vw] max-w-full px-8 py-2 whitespace-pre-wrap text-justify resize-none"/>
   );
};
