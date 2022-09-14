export interface User {
    name: string;
    email: number;
    isAdmin: boolean;
}

export interface Prompt{
    query: string;
    answer: string;
    type: "Formula" | "Explain";
    unixtime: number;
}

