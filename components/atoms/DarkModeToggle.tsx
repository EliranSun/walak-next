'use client';
import {useState} from "react";
import Icon from "@/components/atoms/Icon";

export const DarkModeToggle = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    return (
        <span onClick={() => setIsDarkMode(!isDarkMode)}>
            <Icon name={isDarkMode ? 'Sun' : 'Moon'}/>
        </span>
    );
};
