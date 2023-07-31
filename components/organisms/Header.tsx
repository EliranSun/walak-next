import {Logo} from "@/components/atoms/Logo";
import Icon from "@/components/atoms/Icon";
import {NavigationLinks} from "@/components/molecules/NavigationLinks";

export const Header = () => {
    return (
        <div
            dir="rtl"
            className="w-full py-4 px-16 flex flex-row justify-between items-center bg-slate-200 shadow-sm sticky top-0">
            <div className="flex items-center gap-6">
                <Logo withTitle/>
                <NavigationLinks/>
            </div>
            <div className="flex gap-4">
                <Icon name="MagnifyingGlass"/>
                <Icon name="List"/>
            </div>
        </div>
    );
};