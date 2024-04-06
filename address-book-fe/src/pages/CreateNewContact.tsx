import axios from "axios";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ContactRequest } from "../types";

const url = "https://applicazioni-web.net/tjf/api"

const CreateNewContact = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false)
    const [newContact, setNewContact] = useState<ContactRequest>({
        name: "",
        email: "",
        phone_number: "",
        type_id: "2"
    })
    console.log(loading)

    const handleCreateNewContact = async () => {
        setLoading(true)
        await axios.post(`${url}/contacts`, newContact).catch((e) => {
            console.log("Error while creating contact: ", e)
        })
        setLoading(false)
        navigate("/")
    }

    const handleUpdateContact = (val: ChangeEvent<HTMLInputElement>, field: string) => {
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