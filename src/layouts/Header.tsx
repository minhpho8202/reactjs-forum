import { SearchIcon, Image } from "lucide-react"
import logo from "/logo.png"
import UserDropDown from "@/components/UserDropDown"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { useContext } from "react"
import { UserContext } from "@/App"

const Header = () => {
    const { currentUser } = useContext(UserContext);

    return (
        <header>
            <nav className="bg-white dark:bg-zinc-950 z-50 fixed top-0 left-0 w-full min-h-[60px] flex items-center border-b px-5 lg:px-14 justify-between">
                <Link to="/">
                    <img
                        src={logo}
                        alt="logo"
                        className="h-10 w-auto"
                    />
                </Link>

                <div className="w-[500px] px-2 py-0 flex items-center justify-around border rounded-md gap-x-1">
                    <Input className="border-none shadow-none focus-visible:ring-0" />
                    <button>
                        <SearchIcon className="w-5 h-5 text-gray-400" />
                    </button>
                </div>

                <div className="flex items-center gap-x-2">
                    {currentUser ? (
                        <UserDropDown />
                    ) : (
                        <Link to="login">
                            <Button size="lg" className="px-4">
                                Log In
                            </Button>
                        </Link>
                    )}
                </div>
            </nav>
        </header>
    )
}

export default Header