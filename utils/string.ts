export const replaceAllSpacesWithDashes = (str: string) => {
   if (!str)
      return;

   return str.replace(/\s/g, '-');
}