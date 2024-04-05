import {
  MdKeyboardArrowDown,
  MdOutlineEmail,
  MdKeyboardArrowUp,
} from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import { Contact } from "../types";
import { Fragment, useState } from "react";

interface Props {
  contact: Contact;
}

const ContactCard = ({ contact }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const handleSaveClick = () => {
    setIsOpen((prev) => !prev);
    setIsEdit((prev) => !prev);
  };

  return (
    <div className="flex flex-col w-full justify-between p-2 bg-white rounded-md card-shadow gap-2">
      <div className="flex w-full justify-between">
        <div className="flex justify-start gap-2 font-arimo">
          <img
            src={contact.avatar}
            alt={"avatar"}
            className="rounded-full w-[50px] h-[50px] border-[1px] border-primary shadow-lg mt-2"
          />
          <div className="flex flex-col">
            <p className="text-primary font-bold">{contact.name}</p>
            <div className="flex justify-start items-center gap-2 mb-1">
              <MdOutlineEmail className="text-primary" />
              <a
                href={`mailto:${contact.email}`}
                className="text-xs text-secondary"
              >
                {contact.email}
              </a>
            </div>
            <div className="flex justify-start items-center gap-2">
              <FaPhone className="text-primary" />
              <a href={`tel:${contact.phone}`} className="text-xs text-secondary">
                {contact.phone}
              </a>
            </div>
          </div>
        </div>
        <button
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? (
            <MdKeyboardArrowUp size={24} className="text-primary" />
          ) : (
            <MdKeyboardArrowDown size={24} className="text-primary" />
          )}
        </button>
      </div>
      {isOpen && (
        <Fragment>
          {isEdit && (
            <div>
              <label className="font-arimo text-sm">Name:</label>
              <input
                type="text"
                placeholder="Name"
                className="w-full rounded-sm text-sm p-2 card-shadow font-arimo my-1"
              />
              <label className="font-arimo text-sm">Email:</label>
              <input
                type="text"
                placeholder="Email"
                className="w-full rounded-sm text-sm p-2 card-shadow font-arimo my-1"
              />
              <label className="font-arimo text-sm">Phone Number:</label>
              <input
                type="text"
                placeholder="Phone Number"
                className="w-full rounded-sm text-sm p-2 card-shadow font-arimo my-1"
              />
            </div>
          )}
          <div className="flex justify-center items-center gap-2 p-2 w-full">
            {!isEdit && (
              <>
                <button
                  onClick={() => setIsEdit((prev) => !prev)}
                  className=" bg-primary p-1 rounded-md text-white font-bold w-full"
                >
                  EDIT
                </button>
                <button className="bg-danger p-1 rounded-md text-white font-bold w-full">
                  DELETE
                </button>
              </>
            )}
            {isEdit && (
              <>
                <button className="bg-tertiary p-1 rounded-md text-white font-bold w-full">
                  CANCEL
                </button>
                <button
                  onClick={() => handleSaveClick()}
                  className=" bg-success p-1 rounded-md text-white font-bold w-full"
                >
                  SAVE
                </button>
              </>
            )}
          </div>
        </Fragment>
      )
      }
    </div>
  );
};

export default ContactCard;
