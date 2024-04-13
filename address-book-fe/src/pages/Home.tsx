import Header from "../components/Header";
import data from "../assets/data.json";
import { IoFilterCircleOutline } from "react-icons/io5";
import { FiPlus } from "react-icons/fi";
import ContactCard from "../components/ContactCard";
import { useEffect, useState, useMemo } from "react";
import { CiSearch } from "react-icons/ci";
import { Contact } from "../types";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";
import useContacts from "../hooks/useContacts";
import { cloneDeep, orderBy } from "lodash";

const Home = () => {
  const [selectedCards, setSelectedCards] = useState<Contact[] | undefined>(
    undefined
  );
  const [searchString, setSearchString] = useState<string | null>(null)
  const [searchTypes, setSearchTypes] = useState<string | null>(null)
  const [sort, setSort] = useState<string>("0")
  const navigate = useNavigate();

  const { contacts, types, loading, refetch, getContacts } = useContacts(searchString, searchTypes)

  useEffect(() => {
    refetch()
    const handleContextmenu = (e: { preventDefault: () => void }) => {
      e.preventDefault();
    };
    document.addEventListener("contextmenu", handleContextmenu);
    return function cleanup() {
      document.removeEventListener("contextmenu", handleContextmenu);
    };
  }, []);

  useEffect(() => {
    if (searchString !== null || searchTypes !== null) {
      getContacts()
    }
  }, [searchString, searchTypes])

  const handleSelect = () => {
    if (selectedCards?.length === data?.length) {
      setSelectedCards(undefined);
    } else {
      setSelectedCards(contacts?.map((c) => c));
    }
  };

  const contactsFound = useMemo(() => {
    return contacts?.length ?? 0
  }, [contacts])

  const sortedContacts = useMemo(() => {
    const clonedContacts = cloneDeep(contacts)
    switch (sort) {
      case "1": return orderBy(clonedContacts, ["name"], "asc")
      case "2": return orderBy(clonedContacts, ["created_at"], "desc")
      case "3": return orderBy(clonedContacts, ["created_at"], "asc")
      default: return clonedContacts
    }
  }, [sort, contacts])

  return (
    <div className="flex flex-col bg-main p-4 gap-4 h-auto min-h-screen">
      <button
        type="button"
        onClick={() => navigate("/new")}
        className={`lg:hidden fixed flex justify-center items-center shadow-xl bottom-6 right-6 rounded-full
                ${selectedCards
            ? "bg-danger transition duration-300 ease-in-out transform rotate-45"
            : "bg-primary transition duration-300 ease-in-out transform rotate-0"
          } 
                text-white border z-20 w-[60px] h-[60px]`}
      >
        <FiPlus size={30} />
      </button>
      <Header />
      <div className="flex items-end gap-4 lg:justify-between">
        <div className="flex flex-col gap-2 w-full">
          <span className="text-sm font-arimo text-primary font-bold">
            Search by name or phone number
          </span>
          <label
            htmlFor="searchString"
            className="relative focus-within:text-gray-600 block w-full"
          >
            <CiSearch className="pointer-events-none w-8 h-8 absolute top-1/2 transform -translate-y-1/2 right-0 text-gray-400 pr-2" />
            <input
              type="text"
              name="searchString"
              id="searchString"
              placeholder="Guido Penta ..."
              className="w-full rounded-sm text-sm p-2 card-shadow font-arimo"
              onChange={(e) => setSearchString(e.target.value)}
            />
          </label>
        </div>
        <IoFilterCircleOutline size={40} className="text-primary lg:hidden" />
        <button
          onClick={() => {
            if (!selectedCards) {
              navigate("/new")
            }
          }}
          className={`${selectedCards
            ? "bg-danger transition duration-300 ease-in-out"
            : "bg-primary transition duration-300 ease-in-out"} p-2 text-white font-semibold lg:flex hidden rounded-sm h-[36px] w-[200px] text-md justify-center items-center`}
        >
          {!selectedCards ? 'Add new contact' : selectedCards.length === 1 ? 'Remove contact' : 'Remove contacts'}
        </button>
      </div>

      <div className="flex justify-between items-center text-sm font-arimo font-bold text-primary">
        {contactsFound > 0 && <p>Found {contactsFound} contacts</p>}
        {selectedCards && (
          <p onClick={handleSelect}>
            {selectedCards?.length === data?.length ? "Unselect" : "Select"} all
          </p>
        )}
      </div>
      <div className="lg:flex lg:justify-normal lg:w-full justify-between gap-4">
        <div className="flex flex-col justify-center gap-2 items-center lg:bg-white lg:p-4 lg:grid lg:grid-cols-3 lg:w-full lg:rounded-sm lg:shadow-md lg:items-start">
          {!loading ?
            !!sortedContacts?.length ?
              sortedContacts.map((contact, index) => (
                <ContactCard
                  contact={contact}
                  key={index}
                  setSelectedCards={setSelectedCards}
                  selectedCards={selectedCards}
                  refetch={refetch}
                />
              )) : <p className="text-primary">No contacts found</p> :
            <div className="lg:col-span-3 lg:items-center lg:w-full lg:h-full">
              <Loader />
            </div>
          }
        </div>
        <div className="lg:flex hidden flex-col items-center gap-4">
          <div className="bg-white flex flex-col justify-center items-center w-full gap-4 p-2">
            <p className="text-sm font-arimo font-bold text-primary">Sort by</p>
            <select id="type" className="rounded-sm border-[1px] border-cancel w-full p-2" onChange={(e) => setSort(e.target.value)}>
              <option value="0">Select a sort ...</option>
              <option value="1">Alphbetically</option>
              <option value="2">Newest</option>
              <option value="3">Oldest</option>
            </select>
          </div>
          <div className="lg:flex hidden w-[200px] shadow-md rounded-sm flex-col items-center gap-4 bg-white p-2 h-full">
            <p className="text-sm font-arimo font-bold text-primary">Filter by</p>
            <div className="flex flex-col gap-1 w-full">
              <p className="font-arimo text-sm text-primary">Type</p>
              <select id="type" className="rounded-sm border-[1px] border-cancel w-full p-2 font-arimo" onChange={(e) => setSearchTypes(e.target.value)}>
                <option value="" >Select a type ...</option>
                {types?.map((t) => {
                  return <option key={t.id} value={t.id}>{t.name}</option>
                })}
              </select>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Home;
