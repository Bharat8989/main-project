import { databases, storage, appwrite } from './appwrite'
import { Query, ID } from 'appwrite'

export interface Paper {
  $id: string
  title: string
  department: string
  year: number
  semester: string
  season: string
  subject: string
  fileId: string
  fileName: string
  uploadedAt: string
  uploadedBy: string
  fileUrl?: string
}

export interface PaperInput {
  title: string
  department: string
  year: number
  semester: string
  season: string
  subject: string
  fileName: string
}

// Create paper
export async function createPaper(
  paper: PaperInput,
  fileId: string,
  uploadedBy: string
): Promise<Paper> {
  try {
    const response = await databases.createDocument(
      appwrite.databaseId,
      appwrite.collectionId,
      ID.unique(),
      {
        ...paper,
        fileId,
        uploadedBy,
        uploadedAt: new Date().toISOString(),
      }
    )
    return response as unknown as Paper
  } catch (error) {
    console.error('Error creating paper:', error)
    throw error
  }
}

// Get papers with filters
export async function getPapers(filters?: {
  department?: string
  year?: number
  semester?: string
}): Promise<Paper[]> {
  try {
    const queries = []

    if (filters?.department) {
      queries.push(Query.equal('department', filters.department))
    }
    if (filters?.year) {
      queries.push(Query.equal('year', filters.year))
    }
    if (filters?.semester) {
      queries.push(Query.equal('semester', filters.semester))
    }

    const response = await databases.listDocuments(
      appwrite.databaseId,
      appwrite.collectionId,
      queries.length > 0 ? queries : []
    )

    return response.documents as unknown as Paper[]
  } catch (error) {
    console.error('Error fetching papers:', error)
    throw error
  }
}

// Get single paper
export async function getPaper(paperId: string): Promise<Paper> {
  try {
    const response = await databases.getDocument(
      appwrite.databaseId,
      appwrite.collectionId,
      paperId
    )
    return response as unknown as Paper
  } catch (error) {
    console.error('Error fetching paper:', error)
    throw error
  }
}

// Update paper
export async function updatePaper(
  paperId: string,
  updates: Partial<PaperInput>
): Promise<Paper> {
  try {
    const response = await databases.updateDocument(
      appwrite.databaseId,
      appwrite.collectionId,
      paperId,
      updates
    )
    return response as unknown as Paper
  } catch (error) {
    console.error('Error updating paper:', error)
    throw error
  }
}

// Delete paper
export async function deletePaper(paperId: string): Promise<void> {
  try {
    await databases.deleteDocument(
      appwrite.databaseId,
      appwrite.collectionId,
      paperId
    )
  } catch (error) {
    console.error('Error deleting paper:', error)
    throw error
  }
}

// Upload file to storage
export async function uploadFile(file: File): Promise<string> {
  try {
    const response = await storage.createFile(
      appwrite.bucketId,
      ID.unique(),
      file
    )
    return response.$id
  } catch (error) {
    console.error('Error uploading file:', error)
    throw error
  }
}

// Get file URL
export function getFileUrl(fileId: string): string {
  return `${appwrite.endpoint}/storage/buckets/${appwrite.bucketId}/files/${fileId}/view?project=${appwrite.projectId}`
}

// Delete file from storage
export async function deleteFile(fileId: string): Promise<void> {
  try {
    await storage.deleteFile(appwrite.bucketId, fileId)
  } catch (error) {
    console.error('Error deleting file:', error)
    throw error
  }
}
