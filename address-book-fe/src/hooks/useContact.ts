import axios from "axios";
import { useState } from "react";
import { ContactRequest } from "../types";
import { useNavigate } from "react-router-dom";

const url = "https://applicazioni-web.net/tjf/api"

const useContact = (contactRequest: ContactRequest, contactId?: string, setIsOpen?: (value: boolean) => void, setIsEdit?: (value: boolean) => void, refetch?: () => void) => {
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const createContact = async () => {
        setLoading(true)
        await axios.post(`${url}/contacts`, contactRequest)
            .then(goToHomePage)
            .catch((e) => {
                setLoading(false)
                console.log("Error while updating contact: ", e)
            })
    }

    const saveContact = async () => {
        setLoading(true)
        if (setIsOpen && setIsEdit && refetch) {
            await axios.put(`${url}/contacts/${contactId}`, contactRequest)
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
    }

    const deleteContact = async () => {
        setLoading(true)
        if (setIsOpen && setIsEdit && refetch) {
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
    }

    const goToHomePage = () => navigate("/")

    return {
        saveContact,
        deleteContact,
        createContact,
        goToHomePage,
        loading
    }
}

export default useContact