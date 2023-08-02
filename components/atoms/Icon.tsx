'use client';
import {useCallback} from 'react';
import {
    ArrowLeft,
    Clock,
    Envelope,
    FacebookLogo,
    List,
    MagnifyingGlass,
    Moon,
    Printer,
    Share,
    Sun,
    Translate,
    TwitterLogo
} from "@phosphor-icons/react";
// import Darkmode from 'darkmode-js';
//
// new Darkmode().showWidget();

const DEFAULT_ICON_SIZE = 22;

const IconSizes = {
   SMALL: 'small',
   MEDIUM: 'medium',
   LARGE: 'large'
} as const;
type IconSizes = typeof IconSizes[keyof typeof IconSizes];

const Icon = ({name, size}: { name: string, size?: IconSizes }) => {
   let iconSize = DEFAULT_ICON_SIZE;

   switch (size) {
      case 'small':
         iconSize = DEFAULT_ICON_SIZE / 2;
         break;

      default:
      case 'medium':
         iconSize = DEFAULT_ICON_SIZE;
         break;

      case 'large':
         iconSize = DEFAULT_ICON_SIZE * 2;
         break;
   }

   const MarkdownIcon = useCallback(() => {
      switch (name) {
         case 'List':
            return <List size={iconSize}/>;

         case 'MagnifyingGlass':
            return <MagnifyingGlass size={iconSize}/>;

         case 'Clock':
            return <Clock size={iconSize}/>;

         case 'Facebook':
            return <FacebookLogo size={iconSize}/>;

         case 'Twitter':
            return <TwitterLogo size={iconSize}/>;

         case 'Email':
            return <Envelope size={iconSize}/>;

         case 'Printer':
            return <Printer size={iconSize}/>;

         case 'ArrowLeft':
            return <ArrowLeft size={iconSize}/>;

         case 'Share':
            return <Share size={iconSize}/>;

         case 'Sun':
            return <Sun size={iconSize}/>;

         case 'Moon':
            return <Moon size={iconSize}/>;

         case 'Translate':
            return <Translate size={iconSize}/>;

         default:
            return null;
      }
   }, [name]);

   return (
      <span className="cursor-pointer select-none">
            <MarkdownIcon/>
        </span>
   )
}

Icon.Sizes = IconSizes;

export default Icon;