import { IoMdClose } from "react-icons/io";
import DefaultAvatar from "../assets/avatar-default.png"
import { CiCircleQuestion, CiLogout, CiSettings } from "react-icons/ci";
import { PiShieldWarningThin } from "react-icons/pi";

interface Props {
    isVisible: boolean
    toggleSlideover: () => void
}

const Slideover = ({ isVisible, toggleSlideover }: Props) => {

    return (
        <div id="slideover-container" className={`w-full h-full fixed inset-0 ${isVisible ? '' : 'invisible'} z-50`}>
            <div onClick={toggleSlideover} id="slideover-bg" className={`w-full h-full duration-500 ease-out transition-all inset-0 absolute bg-gray-900 ${isVisible ? 'opacity-50' : 'opacity-0'}`}></div>
            <div id="slideover" className={`w-[300px] bg-white h-full absolute duration-300 ease-out transition-all ${isVisible ? 'left-0' : '-left-full'}`}>
                <div className="flex flex-col w-full h-full p-2 gap-4">
                    <div className="flex justify-end items-center w-full">
                        <button onClick={toggleSlideover}>
                            <IoMdClose size={30} className="text-primary" />
                        </button>
                    </div>
                    <div className="flex justify-center items-center gap-2">
                        <img
                            src={DefaultAvatar}
                            alt={"avatar"}
                            className={`rounded-full w-[100px] lg:w-[150px] h-[100px] lg:h-[150px] border-[1px] bg-white border-primary shadow-lg`}
                        />
                    </div>
                    <div className="flex flex-col justify-center items-center w-full">
                        <p className="font-arimo text-primary text-2xl font-semibold">Omar Said</p>
                        <p className="font-arimo text-primary text-md font-thin">Admin</p>
                    </div>
                    <div className="h-2/3 w-full flex flex-col justify-end items-end gap-2">
                        <div className="w-full flex items-center gap-4 cursor-pointer p-2">
                            <PiShieldWarningThin size={30} className="text-primary" />
                            <p className="text-primary text-md">Terms & Conditions</p>
                        </div>
                        <div className="w-full flex items-center gap-4 cursor-pointer p-2">
                            <CiCircleQuestion size={30} className="text-primary" />
                            <p className="text-primary text-md">FAQ</p>
                        </div>
                        <div className="w-full flex items-center gap-4 cursor-pointer p-2">
                            <CiSettings size={30} className="text-primary" />
                            <p className="text-primary text-md">Settings</p>
                        </div>
                        <div className="w-full flex items-center gap-4 cursor-pointer p-2">
                            <CiLogout size={30} className="text-primary" />
                            <p className="text-primary text-md">Sign Out</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Slideover;
