'use client';
import {Logo} from "@/components/atoms/Logo";
import {AboutParagraph} from "@/components/atoms/AboutParagraph";
import {NewsLetterSubscribe} from "@/components/molecules/NewsLetterSubscribe";
import {SocialStrip} from "@/components/molecules/SocialStrip";
import {Link} from "@/components/atoms/Link";
import {useTranslations} from "next-intl";

export const Footer = () => {
   const t = useTranslations('Footer');

   return (
      <footer className="border-t border-gray-400 w-full p-4" dir="rtl">
         <div className="flex gap-8 pb-4 border-b border-gray-400">
            <div className="w-1/3 flex items-start gap-4">
               <Logo/>
               <AboutParagraph isShort/>
            </div>
            <div className="w-2/3 flex items-start justify-between">
               <NewsLetterSubscribe/>
               <SocialStrip/>
            </div>
         </div>
         <div className="flex w-full justify-between">
            <ul className="flex text-xs gap-1">
               <Link href="/">
                  <li>תנאי שימוש</li>
               </Link>
               <span>•</span>
               <Link href="https://www.buymeacoffee.com/walak">
                  <li>צרו קשר</li>
               </Link>
               <span>•</span>
               <Link href="https://www.buymeacoffee.com/walak">
                  <li>{t('buy_coffee')}</li>
               </Link>
            </ul>
            <span className="text-xs">
                    Made with 💛 by the OC Team © 2016-{new Date().getFullYear()}
                </span>
         </div>
      </footer>
   )
}