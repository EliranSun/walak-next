import React from "react";

export const DateLocaleString = ({ date, locale = 'he-IL' }: { date: string, locale?: string }) => {
   if (!date) return null;
   
   return (
      <div className="md:border-b border-r border-gray-300 md:w-full pr-2 md:pb-2 opacity-60 text-xs">
         {new Date(date).toLocaleString(locale, {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
         })}
      </div>
   )
}