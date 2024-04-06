import {
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdOutlineEmail,
} from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import { Contact, ContactUpdateRequest } from "../types";
import useLongPress from "../hooks/useLongPress";
import { ChangeEvent, Fragment, useMemo, useState } from "react";
import DefaultAvatar from "../assets/avatar-default.png"
import axios from "axios"

interface ContactProps {
  contact: Contact;
  setSelectedCards: (value: Contact[] | undefined) => void;
  selectedCards: Contact[] | undefined;
}

const url = "https://applicazioni-web.net/tjf/api"

const ContactCard = ({
  contact,
  setSelectedCards,
  selectedCards,
}: ContactProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [updateContact, setUpdateContact] = useState<ContactUpdateRequest>({
    name: contact?.name,
    email: contact?.email,
    phone_number: contact?.phone_number,
    type_id: contact?.type_id
  })
  const onLongPress = useLongPress();

  const isContactSelected = useMemo(() => {
    return !!selectedCards?.find((c) => c.name === contact?.name);
  }, [contact, selectedCards]);

  const handleOnClick = () => {
    if (isContactSelected) {
      if (!!selectedCards?.length && selectedCards.length === 1) {
        setSelectedCards(undefined);
      } else {
        const filteredCardsSelected = selectedCards?.filter(
          (c) => c.name !== contact?.name
        );
        setSelectedCards(filteredCardsSelected);
      }
    } else {
      if (!!selectedCards?.length && selectedCards.length >= 1) {
        const currentCardsSelected = selectedCards;
        currentCardsSelected?.push(contact);
        setSelectedCards([...currentCardsSelected]);
      }
    }
  };

  const handleOnLongPress = () => {
    if (!selectedCards && !isOpen) {
      setSelectedCards([contact]);
    }
  };

  const handleSaveClick = () => {
    setIsOpen((prev) => !prev);
    setIsEdit((prev) => !prev);
  };

  const handleUpdateContact = (val: ChangeEvent<HTMLInputElement>, field: string) => {
    setUpdateContact(prev => ({ ...prev, [field]: val.target.value }))
  }

  const handleSaveContact = () => {
    setLoading(true)
    axios.put(`${url}/contacts/${contact.id}`, updateContact).catch((e) => {
      console.log("Error while updating contact: ", e)
    })
    setLoading(false)
    handleSaveClick()
  }

  const handleDeleteContact = () => {
    setLoading(true)
    axios.delete(`${url}/contacts/${contact.id}`).catch((e) => {
      console.log("Error while deleting contact: ", e)
    })
    setLoading(false)
    handleSaveClick()
  }

  return (
    <div
      onClick={handleOnClick}
      {...onLongPress(handleOnLongPress)}
      className={`flex flex-col w-full justify-between items-center p-2 gap-2 ${isContactSelected
        ? "bg-primary transition duration-300 ease-in-out"
        : "bg-white transition duration-300 ease-in-out"
        } rounded-md card-shadow`}
    >
      <div className="flex w-full justify-between">
        <div className="flex justify-start items-center gap-2 font-arimo">
          <img
            src={contact?.avatar ?? DefaultAvatar}
            alt={"avatar"}
            className={`rounded-full w-[50px] h-[50px] border-[1px] bg-white ${isContactSelected
              ? "border-white transition duration-300 ease-in-out"
              : "border-primary transition duration-300 ease-in-out"
              } shadow-lg`}
          />
          <div className="flex flex-col">
            <p
              className={`${isContactSelected
                ? "text-white transition duration-300 ease-in-out"
                : "text-primary transition duration-300 ease-in-out"
                } font-bold`}
            >
              {contact?.name}
            </p>
            <div className="flex justify-start items-center gap-2 mb-1">
              <MdOutlineEmail
                className={`${isContactSelected
                  ? "text-white transition duration-300 ease-in-out"
                  : "text-primary transition duration-300 ease-in-out"
                  }`}
              />
              <a
                href={`mailto:${contact?.email}`}
                className={`text-xs underline ${isContactSelected
                  ? "text-white transition duration-300 ease-in-out"
                  : "text-secondary transition duration-300 ease-in-out"
                  }`}
              >
                {contact?.email}
              </a>
            </div>
            <div className="flex justify-start items-center gap-2">
              <FaPhone
                className={`${isContactSelected
                  ? "text-white transition duration-300 ease-in-out"
                  : "text-primary transition duration-300 ease-in-out"
                  }`}
              />
              <a
                href={`tel:${contact?.phone_number}`}
                className={`text-xs ${isContactSelected
                  ? "text-white transition duration-300 ease-in-out"
                  : "text-secondary transition duration-300 ease-in-out"
                  }`}
              >
                {contact?.phone_number}
              </a>
            </div>
          </div>
        </div>
        <button
          disabled={isContactSelected}
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
                onChange={(val) => handleUpdateContact(val, "name")}
              />
              <label className="font-arimo text-sm">Email:</label>
              <input
                type="text"
                placeholder="Email"
                className="w-full rounded-sm text-sm p-2 card-shadow font-arimo my-1"
                onChange={(val) => handleUpdateContact(val, "email")}
              />
              <label className="font-arimo text-sm">Phone Number:</label>
              <input
                type="text"
                placeholder="Phone Number"
                className="w-full rounded-sm text-sm p-2 card-shadow font-arimo my-1"
                onChange={(val) => handleUpdateContact(val, "phone_number")}
              />
            </div>
          )}
          <div className="flex justify-center items-center gap-2 pt-2 w-full">
            {!isEdit ? (
              <Fragment>
                <button
                  onClick={() => setIsEdit((prev) => !prev)}
                  className=" bg-primary p-1 rounded-sm text-white font-bold w-full"
                >
                  EDIT
                </button>
                <button className="bg-danger p-1 rounded-sm text-white font-bold w-full" onClick={handleDeleteContact}>
                  DELETE
                </button>
              </Fragment>
            ) : (
              <Fragment>
                <button className="bg-tertiary p-1 rounded-sm text-white font-bold w-full" onClick={handleSaveClick} disabled={loading}>
                  CANCEL
                </button>
                <button
                  onClick={handleSaveContact}
                  disabled={loading}
                  className=" bg-success p-1 rounded-sm text-white font-bold w-full"
                >
                  SAVE
                </button>
              </Fragment>
            )}
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default ContactCard;
