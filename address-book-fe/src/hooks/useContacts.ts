import axios from "axios"
import { useEffect, useState } from "react"
import { Contact, Type } from "../types"

const url = "https://applicazioni-web.net/tjf/api"

const useContacts = (searchString: string, searchTypes: string | null) => {

    const [contacts, setContacts] = useState<Contact[]>([])
    const [types, setTypes] = useState<Type[]>([])
    const [loading, setLoading] = useState<boolean>(true);

    const fetchTypes = async () => {
        const { data } = await axios.get(`${url}/types`)
        setTypes(data)
    }

    const fetchContacts = async () => {
        const { data } = await axios.get(`${url}/contacts`)
        setContacts(data)
    }

    const fetchAll = async () => {
        await fetchContacts()
        await fetchTypes()
        setLoading(false)
    }

    useEffect(() => {
        fetchAll()
    }, [])

    useEffect(() => {
        const searchContacts = async () => {
            let request = `${url}/contacts?`
            if (searchString) {
                request += `&searchString=${searchString}`
            }
            if (!!searchTypes) {
                request += `&searchType=${searchTypes}`
            }
            const { data } = await axios.get(request)
            setContacts(data)
        }

        searchContacts()

    }, [searchString, searchTypes])

    return {
        contacts,
        types,
        loading,
        refetch: fetchAll
    }
}

export default useContacts