import { DropdownMenu, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { MenuIcon, MoonIcon } from "lucide-react";
import { useTheme } from "./ThemeToggle";
import { Switch } from "./ui/switch";
import { useContext } from "react";
import { UserContext } from "@/App";
import { Link, useNavigate } from "react-router-dom";

const UserDropDown = () => {
    const { logout } = useContext(UserContext);
    const { theme, setTheme } = useTheme();

    const handleChange = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    }

    const handleLogout = () => {
        logout();
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <div className="px-4 py-2 rounded-md bg-primary text-white hover:bg-primary-dark flex items-center gap-x-3 cursor-pointer">
                    <MenuIcon className="w-6 h-6 lg:w-5 lg:h-5 text-primary-foreground" />
                    <img src="https://img.freepik.com/premium-vector/social-media-logo_1305298-29989.jpg"
                        alt="default user's avatar"
                        className="rounded-full h-6 w-6 hidden lg:block" />
                </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuItem>
                    <Link to="/me">
                        Account Information
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex items-center justify-between">
                    <div className="flex items-center">
                        <MoonIcon className="h-4 w-4 mr-1" />
                        <span>Dark Mode</span>
                    </div>
                    <Switch
                        checked={theme === "dark"}
                        onCheckedChange={handleChange}
                    />
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                    <p>Log out</p>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default UserDropDown