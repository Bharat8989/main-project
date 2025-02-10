
import env  from '@/app/env';

import { Client, Account ,Avatars,Databases,Storage } from 'appwrite';

export const client = new Client();

client
    .setEndpoint(env.appwrite.endpoint)
    .setProject(env.appwrite.projectId); // Replace with your project ID

// export const account = new Account(client);

const account = new Account(client);
const databases = new Databases(client);
const avatars = new Avatars(client);
const storage = new Storage(client);
// const databases = new Account(client);

export {client,databases,account,avatars,storage}



// export { ID } from 'appwrite';