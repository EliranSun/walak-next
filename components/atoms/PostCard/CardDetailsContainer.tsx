import React from "react";
import classNames from "classnames";

export const CardDetailsContainer = ({ children, isLean, isLarge }: { children: React.ReactNode, isLean?: boolean, isLarge?: boolean }) => {
   return (
      <div className={classNames("text-right w-full flex justify-between", {
         "flex-col py-2 px-4": !isLarge,
         "px-4": !isLarge && !isLean,
         "px-4 py-6 h-full flex-col items-start md:flex-row md:items-center": isLarge
      })}>
            {children}
      </div>
   );
};