import { Client, Databases, Storage, Account } from 'appwrite'

const endpoint = process.env.VITE_APPWRITE_ENDPOINT || process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1'
const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || ''

const client = new Client()
  .setEndpoint(endpoint)
  .setProject(projectId)

export const account = new Account(client)
export const databases = new Databases(client)
export const storage = new Storage(client)

export const appwrite = {
  endpoint,
  projectId,
  databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || '',
  collectionId: process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID || 'question_papers',
  bucketId: process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID || 'papers-bucket',
}

export default client
