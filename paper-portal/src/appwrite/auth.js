import { Account } from "appwrite";
import client from "./config";

const account = new Account(client);

// LOGIN
export const loginUser = async (email, password) => {
  return await account.createEmailPasswordSession(email, password);
};

// CHECK LOGIN (SESSION)
export const getCurrentUser = async () => {
  return await account.get();
};

// LOGOUT
export const logoutUser = async () => {
  return await account.deleteSession("current");
};
