import {Logo} from "@/components/atoms/Logo";
import {AboutParagraph} from "@/components/atoms/AboutParagraph";
import {NewsLetterSubscribe} from "@/components/molecules/NewsLetterSubscribe";
import {SocialStrip} from "@/components/molecules/SocialStrip";
import {Link} from "@/components/atoms/Link";

export const Footer = () => {
    return (
        <footer className="border-t border-gray-300 w-full p-4" dir="rtl">
            <div className="flex gap-8 mb-4 border-b border-gray-400">
                <div className="w-1/3 flex items-start gap-4">
                    <Logo/>
                    <AboutParagraph isShort/>
                </div>
                <div className="w-2/3 flex items-start justify-between">
                    <NewsLetterSubscribe/>
                    <SocialStrip/>
                </div>
            </div>
            <div className="flex w-full justify-between my">
                <ul className="flex text-xs gap-1">
                    <Link href="/">
                        <li>תנאי שימוש</li>
                    </Link>
                    <span>•</span>
                    <li>צרו קשר</li>
                    <span>•</span>
                    <li>קנו לנו קפה</li>
                </ul>
                <span className="text-xs">
                    Made with 💛 by the OC Team © 2016-{new Date().getFullYear()}
                </span>
            </div>
        </footer>
    )
}