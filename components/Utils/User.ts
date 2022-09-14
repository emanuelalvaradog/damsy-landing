export interface User {
    name: string;
    email: number;
    uid: string;
    isAdmin: boolean;
}

export interface Prompt{
    query: string;
    answer: string;
    type: "Formula" | "Explain";
    uid: string;
    unixtime: number;
}

