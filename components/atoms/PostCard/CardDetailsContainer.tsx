import React from "react";
import classNames from "classnames";

export const CardDetailsContainer = ({ children, isLean, isLarge }: { children: React.ReactNode, isLean?: boolean, isLarge?: boolean }) => {
   return (
      <div className={classNames("text-right w-full flex justify-between py-2", {
         "flex-col": !isLarge,
         "px-4": !isLarge && !isLean,
         "h-full flex-col items-start md:flex-row md:items-center": isLarge
      })}>
            {children}
      </div>
   );
};