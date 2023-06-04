import { Client, Account, Databases } from "appwrite";

const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("6478fa3b3c19f86b107d");

export const account = new Account(client);

export const databases = new Databases(client);
