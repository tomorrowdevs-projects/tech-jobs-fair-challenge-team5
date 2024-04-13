import axios from "axios"
import { useState } from "react"
import { Contact, Type } from "../types"
import { atom } from 'nanostores'
import { useStore } from '@nanostores/react'

const url = "https://applicazioni-web.net/tjf/api"
export const $types = atom<Type[]>([])
export const $contacts = atom<Contact[]>([])

const useContacts = (searchString?: string | null, searchTypes?: string | null) => {
    const types = useStore($types)
    const contacts = useStore($contacts)
    const [loading, setLoading] = useState<boolean>(true);

    const fetchTypes = async () => {
        const { data } = await axios.get(`${url}/types`)
        $types.set(data)
    }

    const fetchContacts = async () => {
        let request = `${url}/contacts?`
        if (searchString) {
            request += `&searchString=${searchString}`
        }
        if (searchTypes) {
            request += `&searchType=${searchTypes}`
        }
        const { data } = await axios.get(request)
        $contacts.set(data)
    }

    const fetchAll = async () => {
        await fetchContacts()
        await fetchTypes()
        setLoading(false)
    }

    return {
        contacts,
        types,
        loading,
        refetch: fetchAll,
        getContacts: fetchContacts
    }
}

export default useContacts