import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  setDoc,
} from 'firebase/firestore'
import { db } from '../fireapp'
import { getAuth } from 'firebase/auth'

const colRef = collection(db, 'logs')

export const getLogs = async () => {
  const q = query(colRef)
  const docs = await getDocs(q)
  return docs.docs.map((doc) => doc.data())
}

export const addLog = async (
  assetId: string,
  date: Date,
  deposit: number,
  balance: number
) => {
  const auth = getAuth()
  console.log('adding docs', auth.currentUser?.uid)
  if (!auth.currentUser) return

  const userDoc = doc(db, 'users', auth.currentUser.uid)
  const assetsCol = collection(userDoc, 'logs')
  return await addDoc(assetsCol, {
    assetId,
    date,
    deposit,
    balance,
  })
}
