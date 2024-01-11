'use client';
import {useState} from "react";
import classNames from "classnames";
import {usePathname, useRouter} from "next/navigation";
import {noop} from "lodash";

export const RadioButton = ({
   label,
   value,
   name,
   onClick,
   isChecked,
   updateSearchParams = true
}: {
   label: string,
   value: string | number,
   name: string,
   isSelected?: boolean,
   onClick?: (isChecked: boolean) => void,
   isChecked?: boolean,
   updateSearchParams?: boolean
}) => {
   const router = useRouter();
   const pathname = usePathname();

   return (
      <div
         className={classNames("w-1/2 border border-dashed border-4 hover:border-black cursor-pointer", {
            "bg-black text-white": isChecked
         })}
         onClick={() => {
            onClick && onClick(!isChecked);

            if (updateSearchParams) {
               return;
            }

            const params = new URLSearchParams();
            params.set(name, value.toString());

            router.replace(`${pathname}?${params.toString()}`, {
               // @ts-ignore-next-line
               scroll: false,
            });
         }}>
         <input
            checked={isChecked}
            onChange={noop}
            value={value}
            name={name}
            type="radio"
            className="md:scale-[2] m-8"/>
         <label>{label}</label>
      </div>
   );
};