export type unix_stamp = number;

export interface User {
    name: string;
    email: number;
    uid: string;
    isAdmin: boolean;
    created: unix_stamp;
}

export interface Prompt{
    query: string;
    answer: string;
    type: "Formula" | "Explain";
    uid: string;
    date: unix_stamp;
}

