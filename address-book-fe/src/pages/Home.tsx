import Header from "../components/Header"
import data from "../assets/data.json"
import { IoFilterCircleOutline } from "react-icons/io5"
import { FiPlus } from "react-icons/fi"
import ContactCard from "../components/ContactCard"
import { useEffect, useState } from "react"
import { CiSearch } from "react-icons/ci"
import { Contact } from "../types"

const Home = () => {
    const [selectedCards, setSelectedCards] = useState<Contact[] | undefined>(undefined)

    useEffect(() => {
        const handleContextmenu = (e: { preventDefault: () => void }) => {
            e.preventDefault()
        }
        document.addEventListener('contextmenu', handleContextmenu)
        return function cleanup() {
            document.removeEventListener('contextmenu', handleContextmenu)
        }
    }, [])

    const handleSelect = () => {
        if (selectedCards?.length === data?.length) {
            setSelectedCards(undefined)
        } else {
            setSelectedCards(data.map((c) => c))
        }
    }

    return (
        <div className="flex flex-col bg-main p-4 gap-4 h-auto min-h-screen">
            <button
                type="button"
                className={`lg:hidden fixed flex justify-center items-center shadow-xl bottom-6 right-6 rounded-full
                ${selectedCards ? 'bg-danger transition duration-300 ease-in-out transform rotate-45' : 'bg-primary transition duration-300 ease-in-out transform rotate-0'} 
                text-white border z-20 w-[60px] h-[60px]`}
            >
                <FiPlus size={30} />
            </button>
            <Header />
            <div className="flex items-end gap-4">
                <div className="flex flex-col gap-2 w-full">
                    <span className="text-sm font-arimo text-primary font-bold">Search by name or phone number</span>
                    <label htmlFor="searchString" className="relative focus-within:text-gray-600 block w-full">
                        <CiSearch className="pointer-events-none w-8 h-8 absolute top-1/2 transform -translate-y-1/2 right-0 text-gray-400 pr-2" />
                        <input type="text" name="searchString" id="searchString" placeholder="Guido Penta ..." className="w-full rounded-sm text-sm p-2 card-shadow font-arimo" />
                    </label>
                </div>
                <IoFilterCircleOutline size={40} className="text-primary" />
            </div>
            <div className="flex justify-between items-center text-sm font-arimo font-bold text-primary">
                <p>Found 10 contacts</p>
                {selectedCards &&
                    <p onClick={handleSelect}>
                        {selectedCards?.length === data?.length ? 'Unselect' : 'Select'} all
                    </p>
                }
            </div>
            <div className="flex flex-col justify-center items-center gap-2">
                {data.map((contact, index) => <ContactCard contact={contact} key={index} setSelectedCards={setSelectedCards} selectedCards={selectedCards} />)}
            </div>
        </div>
    )
}

export default Home