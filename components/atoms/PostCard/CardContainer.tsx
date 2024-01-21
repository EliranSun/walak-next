import classNames from "classnames";
import React from "react";

export const CardContainer = ({ isLean, isLarge, children }: { isLean?: boolean, isLarge?: boolean, children: React.ReactNode }) => {
   return (
      <div className={classNames("flex flex-col items-center text-right hover:text-blue-500 cursor-pointer", {
         "bg-white shadow-sm md:max-w-[288px] w-full": !isLean && !isLarge,
         "w-60": isLean,
         "border-b border-gray-300": isLarge
      })}>
         {children}
      </div>
   )
};