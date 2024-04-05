import {
  MdKeyboardArrowDown,
  MdOutlineEmail,
  MdKeyboardArrowUp,
} from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import { Contact } from "../types";
import { useState } from "react";
import { FaTrashAlt, FaUserEdit, FaSave } from "react-icons/fa";

interface Props {
  contact: Contact;
}

const ContactCard = ({ contact }: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);

  const handleEditClick = () => setEdit(!edit);
  const handleArrowClick = () => setOpen(!open);
  const handleSaveClick = () => {
    setOpen(!open);
    setEdit(!edit);
  };

  return (
    <div className="flex w-full justify-between p-2 bg-white rounded-md card-shadow relative">
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

          {open && (
            <>
              {edit && (
                <div className="py-4">
                  <label className="my-4">name:</label>
                  <input
                    type="text"
                    placeholder="write new name"
                    className="w-full rounded-sm text-sm p-2 card-shadow font-arimo my-2"
                  />
                  <label className="my-4">e-mail:</label>
                  <input
                    type="text"
                    placeholder="write new e-mail"
                    className="w-full rounded-sm text-sm p-2 card-shadow font-arimo my-2"
                  />
                  <label className="my-4">phone:</label>
                  <input
                    type="text"
                    placeholder="write new phone number"
                    className="w-full rounded-sm text-sm p-2 card-shadow font-arimo my-2"
                  />
                </div>
              )}
              <div className="flex justify-start items-center gap-2 p-2 w-full">
                <div>
                  {!edit && (
                    <>
                      <button
                        onClick={() => handleEditClick()}
                        className=" bg-primary p-2 rounded-md text-white font-bold"
                      >
                        {/* <FaUserEdit size={24} className="text-white" /> */}
                        EDIT
                      </button>
                      <button className=" bg-red-500 p-2 rounded-md text-white font-bold mr-2">
                        {/* <FaTrashAlt size={24} className="text-white" /> */}
                        DELETE
                      </button>
                    </>
                  )}
                </div>
                <div className="absolute right-12 ">
                  {edit && (
                    <>
                      <button className=" bg-slate-400 p-2 rounded-md text-white font-bold mr-2">
                        {/* <FaTrashAlt size={24} className="text-white" /> */}
                        CANCEL
                      </button>
                      <button
                        onClick={() => handleSaveClick()}
                        className=" bg-green-500 p-2 rounded-md text-white font-bold"
                      >
                        {/* <FaSave size={24} className="text-white" /> */}
                        SAVE
                      </button>
                    </>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <button
        onClick={() => handleArrowClick()}
        className="absolute top-6 right-4 "
      >
        {open ? (
          <MdKeyboardArrowUp size={24} className="text-primary" />
        ) : (
          <MdKeyboardArrowDown size={24} className="text-primary" />
        )}
      </button>
    </div>
  );
};

export default ContactCard;
