import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ContactRequest, Type } from "../types";

const url = "https://applicazioni-web.net/tjf/api"

const CreateNewContact = () => {
    const navigate = useNavigate();
    const [types, setTypes] = useState<Type[]>([])
    const [newContact, setNewContact] = useState<ContactRequest>({
        name: "",
        email: "",
        phone_number: "",
        type_id: ""
    })

    useEffect(() => {
        const fetchTypes = async () => {
            const { data } = await axios.get(`${url}/types`)
            setTypes(data)
        }
        fetchTypes()
    }, [])

    const handleCreateNewContact = async () => {
        await axios.post(`${url}/contacts`, newContact)
            .then(() => navigate("/"))
            .catch((e) => {
                console.log("Error while creating contact: ", e)
            })
    }

    const handleUpdateContact = (val: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>, field: string) => {
        setNewContact(prev => ({ ...prev, [field]: val.target.value }))
    }

    return (
        <div className="flex flex-col bg-main p-4 gap-4 h-auto min-h-screen">
            <h1 className="text-2xl font-arimo text-primary font-bold">
                New Contact:
            </h1>
            <div className="flex justify-center items-center gap-2">
                <label className="font-arimo text-sm w-[50px]">Name:</label>
                <input
                    type="text"
                    placeholder="Name"
                    className="w-full rounded-sm text-sm p-2 card-shadow font-arimo my-1"
                    onChange={(val) => handleUpdateContact(val, "name")}
                />
            </div>
            <div className="flex justify-center  items-center gap-2">
                <label className="font-arimo text-sm w-[50px]">Email:</label>
                <input
                    type="text"
                    placeholder="Email"
                    className="w-full rounded-sm text-sm p-2 card-shadow font-arimo my-1"
                    onChange={(val) => handleUpdateContact(val, "email")}
                />
            </div>

            <div className="flex justify-center  items-center gap-2">
                <label className="font-arimo text-sm w-[50px]">Phone:</label>
                <input
                    type="text"
                    placeholder="Phone"
                    className="w-full rounded-sm text-sm p-2 card-shadow font-arimo my-1"
                    onChange={(val) => handleUpdateContact(val, "phone_number")}
                />
            </div>
            <div className="flex justify-center  items-center gap-2">
                <label className="font-arimo text-sm w-[50px]">Type:</label>
                <select id="type" className="rounded-sm shadow-md w-full p-2 font-arimo" onChange={(e) => handleUpdateContact(e, "type_id")}>
                    <option value="Select a type ..." disabled>Select a type ...</option>
                    {types?.map((t) => {
                        return <option key={t.id} value={t.id}>{t.name}</option>
                    })}
                </select>
            </div>
            <div className="flex justify-center  items-center gap-2">
                <button
                    className="bg-tertiary p-1 rounded-sm text-white font-bold w-full"
                    onClick={() => navigate("/")}
                >
                    CANCEL
                </button>
                <button className=" bg-success p-1 rounded-sm text-white font-bold w-full" onClick={handleCreateNewContact}>
                    CREATE
                </button>
            </div>
        </div>
    );
}

export default CreateNewContact;