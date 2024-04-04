import Header from "../components/Header"
import data from "../assets/data.json"
import { IoFilterCircleOutline } from "react-icons/io5"
import { FiPlus } from "react-icons/fi"
import ContactCard from "../components/ContactCard"

const Home = () => {
    return (
        <div className="flex flex-col bg-main p-4 gap-4 h-auto min-h-screen">
            <button
                type="button"
                className="fixed flex justify-center items-center shadow-xl bottom-6 right-6 rounded-full bg-primary text-white border z-20 w-[60px] h-[60px]"
            >
                <FiPlus size={30} />
            </button>
            <Header />
            <div className="flex items-center gap-4">
                <input type="text" name="searchString" placeholder="Name, Phone Number ..." className="w-full rounded-sm text-sm p-2 card-shadow font-arimo" />
                <IoFilterCircleOutline size={40} className="text-primary" />
            </div>
            <div className="flex justify-between items-center text-sm font-arimo font-bold text-primary">
                <p>Found 10 contacts</p>
                {/* <p>Select all</p> */}
            </div>
            <div className="flex flex-col justify-center items-center gap-2">
                {data.map((contact) => <ContactCard contact={contact} />)}
            </div>
        </div>
    )
}

export default Home