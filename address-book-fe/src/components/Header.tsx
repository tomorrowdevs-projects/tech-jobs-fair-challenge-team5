import { RxHamburgerMenu } from "react-icons/rx"
import logo from "../assets/logo.png"

const Header = () => {
    return (
        <div className="flex justify-center items-center relative">
            <button className="text-primary absolute left-0">
                <RxHamburgerMenu size={24} />
            </button>
            <img src={logo} alt="logo" className="w-[200px]" />
        </div>
    )
}

export default Header