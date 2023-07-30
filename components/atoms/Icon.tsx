'use client';
import {useCallback} from 'react';
import {List, MagnifyingGlass} from "@phosphor-icons/react";

const DEFAULT_ICON_SIZE = 21;

export const Icon = ({name}: { name: string }) => {
   const MarkdownIcon = useCallback(() => {
      switch (name) {
         case 'List':
            return <List size={DEFAULT_ICON_SIZE}/>;

         case 'MagnifyingGlass':
            return <MagnifyingGlass size={DEFAULT_ICON_SIZE}/>;

         default:
            return null;
      }
   }, [name]);

   return (
      <span>
         <MarkdownIcon/>
      </span>
   )
}