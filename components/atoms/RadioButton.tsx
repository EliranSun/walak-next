'use client';
import {useState} from "react";
import classNames from "classnames";
import {usePathname, useRouter} from "next/navigation";

export const RadioButton = ({
    label,
    value,
    name,
    onClick,
    isChecked: isCheckedProp,
    updateSearchParams = true
}: {
    label: string,
    value: string | number,
    name: string,
    onClick?: (isChecked: boolean) => void,
    isChecked?: boolean,
    updateSearchParams?: boolean
}) => {
    const [isChecked, setIsChecked] = useState<boolean>(isCheckedProp || false);
    const router = useRouter();
    const pathname = usePathname();

    return (
        <div
            onClick={() => {
                setIsChecked(!isChecked);
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
            }}
            className={classNames("w-1/2 border border-dashed border-4 hover:border-black cursor-pointer", {
                "bg-black text-white": isChecked
            })}>
            <input
                value={value}
                name={name}
                defaultChecked={isChecked}
                type="radio"
                className="md:scale-[2] m-8"/>
            <label>{label}</label>
        </div>
    );
};