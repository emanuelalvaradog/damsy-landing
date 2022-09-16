import { unix_stamp } from "./Utils";

export interface History{
    type: "Formula" | "Explain";
    query: string;
    result: string;
    uid: string;
    date: unix_stamp;
}