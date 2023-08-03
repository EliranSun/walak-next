'use client';
import {FunctionComponent, useCallback} from 'react';
import * as PhosphorIcons from "@phosphor-icons/react";

// import Darkmode from 'darkmode-js';
// new Darkmode().showWidget();

const DEFAULT_ICON_SIZE = 22;

const IconSizes = {
   SMALL: 'small',
   MEDIUM: 'medium',
   LARGE: 'large'
} as const;

type IconSizes = typeof IconSizes[keyof typeof IconSizes];
type IconName = keyof typeof PhosphorIcons;
type IconComponentType = FunctionComponent<{ size: number }>;

const Icon = ({name, size}: { name: IconName, size?: IconSizes }) => {
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
      const IconComponent = PhosphorIcons[name] as IconComponentType;
      return IconComponent ? <IconComponent size={iconSize}/> : null;
   }, [name]);

   return (
      <span className="cursor-pointer select-none">
            <MarkdownIcon/>
        </span>
   )
}

Icon.Sizes = IconSizes;

export default Icon;