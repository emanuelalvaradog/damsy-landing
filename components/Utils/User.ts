import { unix_stamp } from "./Utils";

export interface User {
  name: string;
  email: string;
  uid: string;
  stripeId: string;
  isAdmin: boolean;
  plan: string;
  lastBought: unix_stamp;
  created: unix_stamp;
}

export interface Prompt {
  query: string;
  answer: string;
  type: "Formula" | "Explain";
  uid: string;
  date: unix_stamp;
}
