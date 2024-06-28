import { getAuth } from 'firebase/auth'
import {
  DocumentData,
  QueryDocumentSnapshot,
  addDoc,
  collection,
  doc,
  getDocs,
} from 'firebase/firestore'
import { db } from '../fireapp'

export const getDocsFromCollection = async (
  colName: string
): Promise<QueryDocumentSnapshot<DocumentData, DocumentData>[]> => {
  const auth = getAuth()
  if (!auth.currentUser) return []

  const userDoc = doc(db, 'users', auth.currentUser.uid)
  const assetsCol = collection(userDoc, colName)
  const querySnapshot = await getDocs(assetsCol)

  return querySnapshot.docs
}

export const addDocsToCollection = async (colName: string, data: any) => {
  const auth = getAuth()
  if (!auth.currentUser) throw new Error('User not found')

  const userDoc = doc(db, 'users', auth.currentUser.uid)
  const assetsCol = collection(userDoc, colName)
  return addDoc(assetsCol, data)
}
