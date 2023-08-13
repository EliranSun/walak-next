'use client';
import {useState} from "react";
import Icon from "@/components/atoms/Icon";

export const DarkModeToggle = ({className}: { className: string }) => {
   const [isDarkMode, setIsDarkMode] = useState(false);
   return (
      <span className={className} onClick={() => setIsDarkMode(!isDarkMode)}>
            <Icon name={isDarkMode ? 'Sun' : 'Moon'}/>
        </span>
   );
};
