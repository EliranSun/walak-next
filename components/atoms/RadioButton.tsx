'use client';
import {useState} from "react";
import classNames from "classnames";

export const RadioButton = ({
    label,
    value,
    name,
    onClick,
    isChecked: isCheckedProp
}: { label: string, value: string | number, name: string, onClick?: (isChecked: boolean) => void, isChecked?: boolean }) => {
    const [isChecked, setIsChecked] = useState<boolean>(isCheckedProp || false);

    return (
        <div
            onClick={() => {
                setIsChecked(!isChecked);
                onClick && onClick(!isChecked);
            }}
            className={classNames("w-1/2 border border-dashed border-4 hover:border-black cursor-pointer", {
                "bg-black text-white": isChecked
            })}>
            <input
                value={value}
                name={name}
                defaultChecked={isChecked}
                type="radio"
                className="scale-[2] m-8"/>
            <label>{label}</label>
        </div>
    );
};