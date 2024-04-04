import { MdKeyboardArrowDown, MdOutlineEmail } from "react-icons/md"
import { FaPhone } from "react-icons/fa6"
import { Contact } from "../types"
import useLongPress from "../hooks/useLongPress"
import { useMemo } from "react"


interface ContactProps {
    contact: Contact
    setSelectedCards: (value: Contact[] | undefined) => void
    selectedCards: Contact[] | undefined
}

const ContactCard = ({ contact, setSelectedCards, selectedCards }: ContactProps) => {
    const onLongPress = useLongPress();

    const isContactSelected = useMemo(() => {
        return !!selectedCards?.find((c) => c.name === contact.name)
    }, [contact, selectedCards])

    const handleOnClick = () => {
        if (isContactSelected) {
            if (!!selectedCards?.length && selectedCards.length === 1) {
                setSelectedCards(undefined)
            } else {
                const filteredCardsSelected = selectedCards?.filter((c) => c.name !== contact.name)
                setSelectedCards(filteredCardsSelected)
            }
        }
        else {
            if (!!selectedCards?.length && selectedCards.length >= 1) {
                const currentCardsSelected = selectedCards
                currentCardsSelected?.push(contact)
                setSelectedCards([...currentCardsSelected])
            }
        }
    }

    const handleOnLongPress = () => {
        if (!selectedCards) {
            setSelectedCards([contact])
        }
    }

    return (
        <div
            onClick={handleOnClick}
            {...onLongPress(handleOnLongPress)}
            className={`flex w-full justify-between items-center p-2 ${isContactSelected ? 'bg-primary transition duration-300 ease-in-out' : 'bg-white transition duration-300 ease-in-out'} rounded-md card-shadow`}
        >
            <div className="flex justify-start items-center gap-2 font-arimo">
                <img src={contact.avatar} alt={"avatar"} className={`rounded-full w-[50px] h-[50px] border-[1px] bg-white ${isContactSelected ? 'border-white transition duration-300 ease-in-out' : 'border-primary transition duration-300 ease-in-out'}  shadow-lg`} />
                <div className="flex flex-col">
                    <p className={`${isContactSelected ? 'text-white transition duration-300 ease-in-out' : 'text-primary transition duration-300 ease-in-out'} font-bold`}>{contact.name}</p>
                    <div className="flex justify-start items-center gap-2 mb-1">
                        <MdOutlineEmail className={`${isContactSelected ? 'text-white transition duration-300 ease-in-out' : 'text-primary transition duration-300 ease-in-out'}`} />
                        <a href={`mailto:${contact.email}`} className={`text-xs underline ${isContactSelected ? 'text-white transition duration-300 ease-in-out' : 'text-secondary transition duration-300 ease-in-out'}`}>{contact.email}</a>
                    </div>
                    <div className="flex justify-start items-center gap-2">
                        <FaPhone className={`${isContactSelected ? 'text-white transition duration-300 ease-in-out' : 'text-primary transition duration-300 ease-in-out'}`} />
                        <a href={`tel:${contact.phone}`} className={`text-xs ${isContactSelected ? 'text-white transition duration-300 ease-in-out' : 'text-secondary transition duration-300 ease-in-out'}`}>{contact.phone}</a>
                    </div>
                </div>
            </div>
            <button disabled={isContactSelected}>
                <MdKeyboardArrowDown size={24} className="text-primary" />
            </button>
        </div>
    )
}

export default ContactCard