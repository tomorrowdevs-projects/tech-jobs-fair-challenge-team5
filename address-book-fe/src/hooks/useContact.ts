import axios from "axios";
import { useState } from "react";
import { ContactRequest } from "../types";

const url = "https://applicazioni-web.net/tjf/api"

const useContact = (contactId: string, updateContact: ContactRequest, setIsOpen: (value: boolean) => void, setIsEdit: (value: boolean) => void, refetch: () => void) => {
    const [loading, setLoading] = useState<boolean>(true);

    const saveContact = async () => {
        setLoading(true)
        await axios.put(`${url}/contacts/${contactId}`, updateContact)
            .then(() => {
                setLoading(false)
                setIsOpen(false);
                setIsEdit(false);
                refetch()
            })
            .catch((e) => {
                setLoading(false)
                setIsOpen(false);
                setIsEdit(false);
                console.log("Error while updating contact: ", e)
            })
    }

    const deleteContact = async () => {
        setLoading(true)
        await axios.delete(`${url}/contacts/${contactId}`)
            .then(() => {
                setLoading(false)
                setIsOpen(false)
                refetch()
            })
            .catch((e) => {
                console.log("Error while deleting contact: ", e)
                setLoading(false)
                setIsOpen(false)
            })
    }

    return {
        saveContact,
        deleteContact,
        loading
    }
}

export default useContact