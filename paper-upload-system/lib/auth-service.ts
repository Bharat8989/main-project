import { account, appwrite } from './appwrite'
import { ID } from 'appwrite'

export interface AdminUser {
  $id: string
  email: string
  name: string
  role: 'admin' | 'superadmin'
  createdAt: string
}

// Sign up admin (only superadmin can do this)
export async function signUpAdmin(
  email: string,
  password: string,
  name: string
): Promise<string> {
  try {
    const response = await account.create(ID.unique(), email, password, name)
    return response.$id
  } catch (error) {
    console.error('Error signing up:', error)
    throw error
  }
}

// Login admin
export async function loginAdmin(
  email: string,
  password: string
): Promise<any> {
  try {
    const response = await account.createEmailPasswordSession(email, password)
    return response
  } catch (error) {
    console.error('Error logging in:', error)
    throw error
  }
}

// Logout admin
export async function logoutAdmin(): Promise<void> {
  try {
    await account.deleteSession('current')
  } catch (error) {
    console.error('Error logging out:', error)
    throw error
  }
}

// Get current user
export async function getCurrentAdmin(): Promise<any> {
  try {
    const user = await account.get()
    return user
  } catch (error) {
    console.error('Error getting current user:', error)
    throw error
  }
}

// Demo admin check (for development)
export function isDemoAdmin(email: string, password: string): boolean {
  const demoEmail = process.env.ADMIN_EMAIL || 'admin@university.edu'
  const demoPassword = process.env.ADMIN_PASSWORD || 'admin123'
  return email === demoEmail && password === demoPassword
}

// Create demo session in localStorage
export function createDemoSession(email: string): void {
  localStorage.setItem(
    'adminSession',
    JSON.stringify({
      email,
      authenticated: true,
      timestamp: Date.now(),
    })
  )
}

// Get demo session
export function getDemoSession(): any {
  try {
    const session = localStorage.getItem('adminSession')
    return session ? JSON.parse(session) : null
  } catch (error) {
    return null
  }
}

// Clear demo session
export function clearDemoSession(): void {
  localStorage.removeItem('adminSession')
}

// Check if admin is authenticated
export function isAdminAuthenticated(): boolean {
  const session = getDemoSession()
  return !!(session && session.authenticated)
}
