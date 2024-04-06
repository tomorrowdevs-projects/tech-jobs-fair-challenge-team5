export type Contact = {
    id: string
    name: string
    avatar: string
    email: string
    type_id: string
    type_name: string
    phone_number: string
}

export type Type = {
    id: string
    name: string
    created_at: Date
    updated_at: Date
}

export type ContactRequest = {
    name: string
    email: string
    type_id: string
    phone_number: string
}