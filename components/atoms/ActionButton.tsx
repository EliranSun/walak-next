'use client';
import {ReactNode, useState} from "react";
import {Check, Spinner} from "@phosphor-icons/react";
import classNames from "classnames";

export const ActionButton = ({label, action, isDisabled, type}: {
   label: string | ReactNode,
   isDisabled?: boolean,
   action?: (onSuccess: () => void) => Promise<any> | void,
   type?: "primary" | "secondary"
}) => {
   const [isLoading, setIsLoading] = useState(false);
   const [isError, setIsError] = useState(false);
   const [isSuccess, setIsSuccess] = useState(false);

   return (
      <button
         disabled={isDisabled}
         className={classNames("border border-black transition-all duration-100 p-2 rounded-md flex justify-center items-center", {
            "cursor-not-allowed opacity-30": isDisabled,
            "bg-black text-white hover:bg-white hover:text-black": type === "primary",
            "bg-white text-black hover:bg-black hover:text-white": type !== "primary",
         })}
         onClick={async () => {
            if (!action) {
               return;
            }

            setIsLoading(true);

            try {
               await action(() => {
                  setIsSuccess(true);
                  setIsError(false);
                  setTimeout(() => {
                     setIsSuccess(false);
                  }, 2500);
               });
            } catch (e) {
               console.error(e);
               setIsError(true);
            } finally {
               setIsLoading(false);
            }
         }}>
         {isLoading
            ? <Spinner className="animate-spin" size={24}/>
            : isSuccess
               ? <Check size={24} color="green" className="animate-bounce"/>
               : label}
         {isError ? <span className="text-red-500">ERROR</span> : null}
      </button>
   );
};
