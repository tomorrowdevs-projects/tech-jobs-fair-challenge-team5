import { MdKeyboardArrowDown, MdOutlineEmail } from "react-icons/md"
import { FaPhone } from "react-icons/fa6"
import { Contact } from "../types"

interface Props {
    contact: Contact
}

const ContactCard = ({ contact }: Props) => {
    return (
        <div className="flex w-full justify-between items-center p-2 bg-white rounded-md card-shadow" >
            <div className="flex justify-start items-center gap-2 font-arimo">
                <img src={contact.avatar} alt={"avatar"} className="rounded-full w-[50px] h-[50px] border-[1px] border-primary shadow-lg" />
                <div className="flex flex-col">
                    <p className="text-primary font-bold">{contact.name}</p>
                    <div className="flex justify-start items-center gap-2 mb-1">
                        <MdOutlineEmail className="text-primary" />
                        <a href={`mailto:${contact.email}`} className="text-xs text-secondary">{contact.email}</a>
                    </div>
                    <div className="flex justify-start items-center gap-2">
                        <FaPhone className="text-primary" />
                        <a href={`tel:${contact.phone}`} className="text-xs text-secondary">{contact.phone}</a>
                    </div>
                </div>
            </div>
            <button>
                <MdKeyboardArrowDown size={24} className="text-primary" />
            </button>
        </div>
    )
}

export default ContactCard