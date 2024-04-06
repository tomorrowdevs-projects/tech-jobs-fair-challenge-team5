import { RxHamburgerMenu } from "react-icons/rx"
import logo from "../assets/logo.png"
import { useState } from "react";
import Slideover from "./SlideOver";

const Header = () => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleSlideover = () => {
        setIsVisible(!isVisible);
    };

    return (
        <div className="relative">
            <div className="flex justify-center items-center relative">
                <button className="text-primary absolute left-0 cursor-pointer" onClick={toggleSlideover}>
                    <RxHamburgerMenu size={24} />
                </button>
                <img src={logo} alt="logo" className="w-[200px]" />
            </div>
            <Slideover isVisible={isVisible} toggleSlideover={toggleSlideover} />
        </div>

    )
}

export default Header