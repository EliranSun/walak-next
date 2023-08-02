import {Logo} from "@/components/atoms/Logo";
import Icon from "@/components/atoms/Icon";
import {NavigationLinks} from "@/components/molecules/NavigationLinks";
import {DarkModeToggle} from "@/components/atoms/DarkModeToggle";

export const Header = () => {
    return (
        <div
            dir="rtl"
            className="w-full py-4 flex flex-row justify-center items-center bg-slate-100 shadow-sm sticky top-0 z-10">
            <div className="max-w-7xl flex justify-between items-center w-full">
                <div className="flex items-center gap-6">
                    <Logo withTitle/>
                    <NavigationLinks/>
                </div>
                <div className="flex gap-4">
                    <Icon name="MagnifyingGlass"/>
                    <DarkModeToggle/>
                    <Icon name="List"/>
                </div>
            </div>
        </div>
    );
};