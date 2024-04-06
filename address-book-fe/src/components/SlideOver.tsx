import DefaultAvatar from "../assets/avatar-default.png"

interface Props {
    isVisible: boolean
    toggleSlideover: () => void
}

const Slideover = ({ isVisible, toggleSlideover }: Props) => {

    return (
        <div id="slideover-container" className={`w-full h-full fixed inset-0 ${isVisible ? '' : 'invisible'} z-50`}>
            <div onClick={toggleSlideover} id="slideover-bg" className={`w-full h-full duration-500 ease-out transition-all inset-0 absolute bg-gray-900 ${isVisible ? 'opacity-50' : 'opacity-0'}`}></div>
            <div id="slideover" className={`w-[300px] bg-white h-full absolute duration-300 ease-out transition-all ${isVisible ? 'left-0' : '-left-full'}`}>
                <div className="flex p-2">
                    <div className="flex justify-center items-center gap-2">
                        <img
                            src={DefaultAvatar}
                            alt={"avatar"}
                            className={`rounded-full w-[100px] lg:w-[150px] h-[100px] lg:h-[150px] border-[1px] bg-white border-primary shadow-lg`}
                        />
                    </div>
                    <div className="flex flex-col justify-between items-end h-[100px] lg:h-[150px] flex-1">
                        <button onClick={toggleSlideover}>
                            <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                        </button>
                        <p className="font-arimo text-primary">Omar</p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Slideover;
