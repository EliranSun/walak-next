import {Logo} from "@/components/atoms/Logo";
import {AboutParagraph} from "@/components/atoms/AboutParagraph";
import {NewsLetterSubscribe} from "@/components/molecules/NewsLetterSubscribe";

export const Footer = () => {
   return (
      <footer className="border-t border-gray-300 w-full p-4 relative flex gap-8">
         <div className="flex items-start gap-4">
            <Logo/>
            <AboutParagraph isShort/>
         </div>
         <NewsLetterSubscribe/>
         <span className="text-xs absolute bottom-5 left-10">
				Made with 💛 by the OC Team © 2016-2023
			</span>
      </footer>
   )
}