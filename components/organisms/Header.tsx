import {Logo} from "@/components/atoms/Logo";
import Icon from "@/components/atoms/Icon";
import {NavigationLinks} from "@/components/molecules/NavigationLinks";
import {DarkModeToggle} from "@/components/atoms/DarkModeToggle";
import {Link} from "@/components/atoms/Link";
import {useLocale} from "next-intl";

export const Header = () => {
   const locale = useLocale();
   const isHebrew = locale === 'he';

   return (
      <div
         dir={isHebrew ? "rtl" : "ltr"}
         className="w-full py-4 flex flex-row justify-center items-center bg-slate-100 shadow-sm sticky top-0 z-10 border-b-2 border-yellow-950/10">
         <div className="max-w-7xl flex justify-between items-center w-full">
            <div className="flex items-center gap-6">
               <Logo withTitle/>
               <NavigationLinks/>
            </div>
            <div className="flex gap-4">
               <Icon name="MagnifyingGlass"/>
               <Link locale={isHebrew ? 'en' : 'he'} href="/">
                  <Icon name="Translate"/>
               </Link>
               <DarkModeToggle/>
               <Icon name="List"/>
            </div>
         </div>
      </div>
   );
};